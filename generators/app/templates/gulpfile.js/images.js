const gulpif = require('gulp-if')
const imagemin = require('gulp-imagemin')
const {argv} = require('yargs')
const {dest, src} = require('gulp')

function images() {
  return src('static/images/**/*.{gif,jpg,png}')
    .pipe(gulpif(argv.prod, imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true,
    })))
    .pipe(dest('_build/images/'))
}

module.exports = images
