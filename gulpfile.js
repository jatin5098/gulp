// grab our gulp packages
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    less = require('gulp-less'),
    gutil = require('gulp-util');

// create a default task and just log a message

//src->rename->uglify->dest
gulp.task('my-task', function() {
    // return gutil.log('My task is runningin gulp!');
    gulp.src(['app/assets/**/*.js'])
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(clean())
        .pipe(gulp.dest('app/js/'));
});

gulp.task('less', function () {
  return gulp.src('app/assets/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('app/css/'));
});


gulp.task('watch', function() {
    gulp.watch('app/assets/**/*.js', ['my-task']);
});

gulp.task('default', ['my-task', 'watch', 'less']);