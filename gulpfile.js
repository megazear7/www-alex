var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

var sassFiles = [
  './global/*.scss',
  './components/**/*.scss',
  './pages/**/*.scss'];

var jsFiles = [
  './global/client.js',
  './components/**/client.js',
  './pages/**/client.js',
  './global/client/*.js',
  './components/**/client/*.js',
  './pages/**/client/*.js'];

gulp.task('sass', function () {
  return gulp.src(sassFiles)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('build.css'))
    .pipe(gulp.dest('./build'));
});

gulp.task('sass:watch', function () {
  gulp.watch(sassFiles, ['sass']);
});

gulp.task('js', function () {
  return gulp.src(jsFiles)
    .pipe(concat('build.js'))
    .pipe(gulp.dest('./build'));
});

gulp.task('js:watch', function () {
  gulp.watch(jsFiles, ['js']);
});

gulp.task('default', ['sass', 'sass:watch', 'js', 'js:watch']);
