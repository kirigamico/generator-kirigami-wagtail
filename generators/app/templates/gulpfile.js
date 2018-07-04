const argv = require('yargs').argv
const autoprefixer = require('gulp-autoprefixer')
const browserSync = require('browser-sync')
const browserify = require('browserify')
const buffer = require('vinyl-buffer')
const csso = require('gulp-csso')
const gulp = require('gulp')
const gulpif = require('gulp-if')
const imagemin = require('gulp-imagemin')
const plumber = require('gulp-plumber')
const sass = require('gulp-sass')
const sassGlob = require('gulp-sass-glob')
const source = require('vinyl-source-stream')
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify')
const watchify = require('watchify')

function plumbing() {
  return plumber({
    errorHandler: function (error) {
      console.log(error.message)
      this.emit('end')
    }
  })
}

gulp.task('browser-sync', function () {
  browserSync({
    proxy: 'http://127.0.0.1:8000',
    open: false,
  })
})

gulp.task('bs-reload', function () {
  browserSync.reload()
})

gulp.task('copy', function () {
  return gulp.src([], {base: './static'})
    .pipe(gulp.dest('_build'))
})

gulp.task('images', function () {
  return gulp.src('static/images/**/*.{gif,jpg,png}')
    .pipe(gulpif(argv.prod, imagemin({optimizationLevel: 3, progressive: true, interlaced: true})))
    .pipe(gulp.dest('_build/images/'))
})

gulp.task('svg', function () {
  return gulp.src('static/svg/**/*.svg')
    .pipe(imagemin({optimizationLevel: 3, progressive: true, interlaced: true}))
    .pipe(gulp.dest('_build/svg/'))
})

gulp.task('styles', function () {
  return gulp.src(['static/styles/**/*.scss'])
    .pipe(plumbing())
    .pipe(sassGlob())
    .pipe(gulpif(!argv.prod, sourcemaps.init()))
    .pipe(sass({
      includePaths: ['node_modules'],
    }))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulpif(argv.prod, csso()))
    .pipe(gulpif(!argv.prod, sourcemaps.write()))
    .pipe(gulp.dest('_build/styles/'))
    .pipe(gulpif(!argv.prod, browserSync.reload({stream: true})))
})

const bundler = browserify({
  entries: ['static/scripts/main.js'],
  debug: !argv.prod,
  cache: {},
  packageCache: {},
})

bundler.transform('babelify')
bundler.transform('envify', {global: true})
if (argv.prod) {
  bundler.transform('uglifyify', {global: true})
}
bundler.transform('browserify-shim', {global: true})

function bundle() {
  return bundler.bundle()
    .on('error', function (error) {
      console.log(error.message)
    })
    .pipe(plumbing())
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(gulpif(argv.prod, uglify()))
    .pipe(gulp.dest('_build/scripts/'))
    .pipe(gulpif(!argv.prod, browserSync.reload({stream: true})))
}

gulp.task('scripts', bundle)

gulp.task('build', ['styles', 'scripts', 'images', 'svg', 'copy'])

gulp.task('default', ['browser-sync'], function () {
  bundler.plugin(watchify)
  bundler.on('update', bundle)
  gulp.watch('static/styles/**/*.scss', ['styles'])
  gulp.watch('static/scripts/**/*.js', ['scripts'])
  gulp.watch('static/images/**/*.{jpg,png}', ['images'])
  gulp.watch('static/svg/**/*.svg', ['svg'])
  gulp.watch('**/*.html', ['bs-reload'])
})
