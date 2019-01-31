const autoprefixer = require('gulp-autoprefixer')
const browserSync = require('browser-sync')
const csso = require('gulp-csso')
const gulpif = require('gulp-if')
const sass = require('gulp-sass')
const sassGlob = require('gulp-sass-glob')
const sourcemaps = require('gulp-sourcemaps')
const {argv} = require('yargs')
const {dest, src} = require('gulp')
const {plumbing} = require('./utils')

const bs = browserSync.get('BrowserSync')

function styles() {
  return src(['static/styles/**/*.scss'])
    .pipe(plumbing())
    .pipe(sassGlob())
    .pipe(gulpif(!argv.prod, sourcemaps.init()))
    .pipe(sass({
      includePaths: ['node_modules'],
    }))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulpif(argv.prod, csso()))
    .pipe(gulpif(!argv.prod, sourcemaps.write()))
    .pipe(dest('_build/styles/'))
    .pipe(gulpif(!argv.prod, bs.reload({stream: true})))
}

module.exports = styles
