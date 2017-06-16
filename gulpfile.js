// grab our gulp packages
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    less = require('gulp-less'),
    gutil = require('gulp-util'),
    inject = require('gulp-inject'),
    babel = require('gulp-babel')
    ;

// create a default task and just log a message

//src->rename->uglify->dest
gulp.task('my-task', function() {
    // return gutil.log('My task is runningin gulp!');
    gulp.src(['app/assets/**/*.js'])
        .pipe(babel({
                presets: ['es2015']
            }))
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

// Select file, add plugins, move to dest
gulp.task('inject-to-html', function () {
    gulp.src('./index.html')
        .pipe(inject(gulp.src('./app/js/*.js', {read: true}), {relative: false}))
        .pipe(inject(gulp.src('./app/css/*.css', {read: true}), {relative: false}))
        .pipe(gulp.dest('./'));
});

gulp.task('es6-to-es5', function () {
    gulp.src('app/js/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('app/js/'));
});

gulp.task('default', ['my-task', 'watch', 'less', 'inject-to-html']);