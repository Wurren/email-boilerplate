var gulp = require("gulp"),
    plumber = require("gulp-plumber"),
    livereload = require("gulp-livereload"),
    nunjucksRender = require("gulp-nunjucks-render"),
    webserver = require("gulp-webserver"),
    less = require("gulp-less"),
    inlineCSS = require("gulp-inline-css");

/*
|--------------------------------------------------------------------------
| Error Catching
|--------------------------------------------------------------------------
*/

var onError = function(err) {
    console.log(err);
    this.emit("end");
};

/*
|--------------------------------------------------------------------------
| Build Nunjucks
|--------------------------------------------------------------------------
*/

gulp.task("render", function() {
    gulp
        .src("src/templates/index.liquid")
        .pipe(
            plumber({
                errorHandler: onError
            })
        )
        .pipe(
            nunjucksRender({
                path: ["./src/templates", "./src/css"]
            })
        )
        .pipe(
            inlineCSS({
                preserveMediaQueries: true,
                removeStyleTags: false
            })
        )
        .pipe(gulp.dest("build"));
});

/*
|--------------------------------------------------------------------------
| Compile Less
|--------------------------------------------------------------------------
*/

gulp.task("less", function() {
    return gulp
        .src("src/less/style.less")
        .pipe(
            plumber({
                errorHandler: onError
            })
        )
        .pipe(less())
        .pipe(gulp.dest("src/css"));
});

/*
|--------------------------------------------------------------------------
| Watch Task
|--------------------------------------------------------------------------
*/

gulp.task("watch", function() {
    gulp.watch(["src/templates/**/*.liquid", "src/css/*.css"], ["render"]);
    gulp.watch("src/less/*.less", ["less"]);
});

gulp.task("webserver", function() {
    gulp.src("build").pipe(
        webserver({
            livereload: true,
            open: true
        })
    );
});

gulp.task("run", ["webserver", "watch"]);
