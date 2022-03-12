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
const filter = require("gulp-filter");
const ts = require("gulp-typescript");

exports.styles = function styles() {
    return gulp.src(["src/**/*.scss", "!src/**/_*"])
        .pipe(sass.sync())
        .pipe(rename({ extname: ".css" }))
        .pipe(postcss())
        .pipe(gulp.dest("docs"))
};

exports.views = function views() {
    return gulp.src(["src/**/*.pug", "!src/**/_*"])
        .pipe(rename({ extname: ".html" }))
        .pipe(data(function (file) {
            return {
                filename: path.basename(file.path)
            };
        }))
        .pipe(pug({
            locals: {
                pages: {'index': 'Home', 'html': 'HTML', 'css': 'CSS', 'js': 'Javascript'},
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
    const tsFilter = filter("**/*.ts", {restore:true});
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

exports.clean = function clean() {
    return fs.promises.rm("docs", {recursive: true, force: true})
}

exports.serve = function browserSyncServe(cb) {
    browserSync.init({
        server: {
            baseDir: "docs"
        }
    });
    cb();
}

exports.refresh = function browserSyncReload(cb) {
    browserSync.reload();
    cb();
}

exports.build = gulp.series(exports.clean, gulp.parallel(exports.styles, exports.views, exports.images, exports.scripts))

exports.watch = function watch() {
    gulp.watch("src/**/*", gulp.series(exports.build, exports.refresh));
}

exports.default = gulp.series(exports.build, exports.serve, exports.watch);
