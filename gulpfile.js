var  gulp           = require('gulp'),
     plumber        = require('gulp-plumber'),
     livereload     = require('gulp-livereload'),
     nunjucksRender = require('gulp-nunjucks-render'),
     webserver  = require('gulp-webserver');


/*
|--------------------------------------------------------------------------
| Error Catching
|--------------------------------------------------------------------------
*/

var onError = function (err) {  
    console.log(err);
    this.emit('end');
};


/*
|--------------------------------------------------------------------------
| Build Nunjucks
|--------------------------------------------------------------------------
*/

gulp.task('render', function () {
    gulp.src('templates/index.html')
    .pipe(plumber({
        errorHandler: onError
    }))
    .pipe(nunjucksRender({
        path: ['templates','css']
    }))
    .pipe(gulp.dest('build'));
});


/*
|--------------------------------------------------------------------------
| Watch Task
|--------------------------------------------------------------------------
*/

gulp.task('watch', function() {
     gulp.watch(['templates/*.html','css/*.css'], ['render']);
});

gulp.task('webserver', function() {
  gulp.src('build')
    .pipe(webserver({
        livereload: true,
        directoryListing: false,
        open: true
    }));
});


gulp.task('run', ['webserver','watch']);