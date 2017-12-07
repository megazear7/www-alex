var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

gulp.task('sass', function () {
  return gulp.src(['./global/*.scss', './components/**/*.scss', './pages/**/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('build.css'))
    .pipe(gulp.dest('./build'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./global/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'sass:watch']);
