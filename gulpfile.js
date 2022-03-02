const gulp = require("gulp");
const data = require("gulp-data")
const sass = require("gulp-sass")(require("sass"))
const rename = require("gulp-rename")
const postcss = require("gulp-postcss")
const pug = require("gulp-pug")
const path = require("path");
const fs = require("fs");

exports.styles = function () {
    return gulp.src(["src/**/*.scss", "!src/**/_*"])
        .pipe(sass.sync())
        .pipe(rename({ extname: ".css" }))
        .pipe(postcss())
        .pipe(gulp.dest("docs"))
};

exports.views = function () {
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
        .pipe(gulp.dest("docs"))
};

exports.images = function () {
    return gulp.src("src/images/**/*")
        .pipe(gulp.dest("docs/images"))
}

exports.scripts = function () {
    return gulp.src("src/scripts/**/*.js")
        .pipe(gulp.dest("docs/scripts"))
}

exports.clean = function () {
    return fs.promises.rm("docs", {recursive: true, force: true})
}

exports.default = gulp.series(exports.clean, gulp.parallel(exports.styles, exports.views, exports.images, exports.scripts))
