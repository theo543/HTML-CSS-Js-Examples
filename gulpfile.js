const gulp = require("gulp");
const data = require("gulp-data")
const sass = require("gulp-sass")(require("sass"))
const rename = require("gulp-rename")
const postcss = require("gulp-postcss")
const pug = require("gulp-pug")
const path = require("path");
const fs = require("fs");
const babel = require("gulp-babel")
const htmlMin = require("gulp-htmlmin")
const browserSync = require('browser-sync').create();
const {spawn} = require("child_process")
const filter = require("gulp-filter");
const ts = require("gulp-typescript");

exports.styles = function styles() {
    return gulp.src(["src/**/*.scss", "!src/**/_*"])
        .pipe(sass.sync())
        .pipe(rename({extname: ".css"}))
        .pipe(postcss(undefined, undefined))
        .pipe(gulp.dest("docs"))
};

exports.views = function views() {
    return gulp.src(["src/**/*.pug", "!src/**/_*"])
        .pipe(rename({extname: ".html"}))
        .pipe(data(function (file) {
            return {
                filename: path.basename(file.path)
            };
        }))
        .pipe(pug({
            locals: {
                pages: {'index': 'Home', 'html': 'HTML', 'css': 'CSS', 'js': 'JavaScript', 'tools': "Tools"},
                originals: {'index': 'home', 'html': 'html', 'css': 'css', 'js': 'js'},
                ext: ".html"
            }
        }))
        .pipe(htmlMin())
        .pipe(gulp.dest("docs"))
};

exports.images = function images() {
    return gulp.src("src/images/**/*")
        .pipe(gulp.dest("docs/images"))
}

exports.scripts = function scripts() {
    const tsFilter = filter("**/*.ts", {restore: true});
    return gulp.src(["src/scripts/**/*.js", "src/scripts/**/*.ts"])
        .pipe(tsFilter)
        .pipe(ts({
            strict: true
        }))
        .pipe(tsFilter.restore)
        .pipe(babel({
            presets: ["@babel/env", "minify"]
        }))
        .pipe(gulp.dest("docs/scripts"));
}

exports.originals = function originals() {
    const index = "gulp_checkout_originals_tmp_git_index";
    // noinspection SpellCheckingInspection
    const firstCommit = "7fd8bc2522cac90cd376bcfd98566eb1edcdd61a";
    const target = "docs/original/";
    return spawn("powershell", [`
        $Env:GIT_INDEX_FILE = "${index}";
        git read-tree "${firstCommit}";
        git checkout-index --prefix="${target}" -a;
        rm Env:/GIT_INDEX_FILE;
        rm "${index}";
    `], {stdio: "inherit"});
}

exports.clean = function clean() {
    return fs.promises.rm("docs", {recursive: true, force: true})
}

exports.serve = function serve(cb) {
    browserSync.init({
        server: {
            baseDir: "docs"
        }
    });
    cb();
}

exports.refresh = function refresh(cb) {
    browserSync.reload("**/*");
    cb();
}

exports.build = gulp.series(exports.clean, gulp.parallel(exports.styles, exports.views, exports.images, exports.scripts, exports.originals))

exports.watch = function watch() {
    gulp.watch("src/**/*", gulp.series(exports.build, exports.refresh));
}

exports.default = gulp.series(exports.build, exports.serve, exports.watch);
