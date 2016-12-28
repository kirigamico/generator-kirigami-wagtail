const argv = require('yargs').argv;
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const bower = require('main-bower-files');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const csso = require('gulp-csso');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const uglify = require('gulp-uglify');

gulp.task('browser-sync', function () {
  browserSync({
    proxy: 'http://127.0.0.1:8000',
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('copy', function () {
  return gulp.src(['static/img/**/*', 'static/favicon/**/*'], {base: './static'})
    .pipe(gulp.dest('_build'));
});

gulp.task('images', function () {
  return gulp.src('static/images/**/*.{jpg,png}')
    .pipe(gulpif(argv.prod, imagemin({optimizationLevel: 3, progressive: true, interlaced: true})))
    .pipe(gulp.dest('_build/images/'));
});

gulp.task('svg', function () {
  return gulp.src('static/svg/**/*.svg')
    .pipe(imagemin({optimizationLevel: 3, progressive: true, interlaced: true}))
    .pipe(gulp.dest('_build/svg/'));
});

gulp.task('styles', function () {
  return gulp.src(['static/styles/**/*.scss'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
      }}))
      .pipe(sassGlob())
      .pipe(sass({
        includePaths: ['bower_components'],
      }))
      .pipe(autoprefixer('last 2 versions'))
      .pipe(gulpif(argv.prod, csso()))
      .pipe(gulp.dest('_build/styles/'))
      .pipe(gulpif(!argv.prod, browserSync.reload({stream: true})));
});

gulp.task('scripts', function () {
  return gulp.src([
    'static/scripts/lib/**/*.js',
    'static/scripts/pages/**/*.js',
    'static/scripts/main.js'
  ])
  .pipe(plumber({
    errorHandler: function (error) {
      console.log(error.message);
      this.emit('end');
    }}))
    .pipe(concat('main.js'))
    .pipe(babel())
    .pipe(gulpif(argv.prod, uglify()))
    .pipe(gulp.dest('_build/scripts/'))
    .pipe(gulpif(!argv.prod, browserSync.reload({stream: true})));
});

gulp.task('bower', function () {
  return gulp.src(bower('**/*.js'))
    .pipe(concat('vendor.js'))
    .pipe(gulpif(argv.prod, uglify()))
    .pipe(gulp.dest('_build/scripts/'))
    .pipe(gulpif(!argv.prod, browserSync.reload({stream: true})));
});

gulp.task('build', ['styles', 'bower', 'scripts', 'images', 'svg', 'copy']);

gulp.task('default', ['browser-sync'], function () {
  gulp.watch('static/styles/**/*.scss', ['styles']);
  gulp.watch('static/scripts/**/*.js', ['scripts']);
  gulp.watch('static/images/**/*.{jpg,png}', ['images']);
  gulp.watch('static/svg/**/*.svg', ['svg']);
  gulp.watch('**/*.html', ['bs-reload']);
});
