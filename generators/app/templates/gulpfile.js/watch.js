const browserSync = require('browser-sync')
const images = require('./images')
const styles = require('./styles')
const svg = require('./svg')
const {compiler} = require('./scripts')
const {watch} = require('gulp')

function watchTask() {
  const bs = browserSync.get('BrowserSync')
  watch('static/styles/**/*.scss', styles)
  watch('static/images/**/*.{jpg,png}', images)
  watch('static/svg/**/*.svg', svg)
  watch('**/*.html', () => bs.reload())

  compiler.watch({}, () => {
    bs.reload()
  })
}

module.exports = watchTask
