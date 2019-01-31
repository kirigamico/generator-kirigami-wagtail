const imagemin = require('gulp-imagemin')
const {dest, src} = require('gulp')

function svg() {
  return src('static/svg/**/*.svg')
    .pipe(imagemin({optimizationLevel: 3, progressive: true, interlaced: true}))
    .pipe(dest('_build/svg/'))
}

module.exports = svg
