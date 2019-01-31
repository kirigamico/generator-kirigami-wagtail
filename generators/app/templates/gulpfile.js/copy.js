const {dest, src} = require('gulp')

function copy() {
  return src('favicons/*', {base: './static'})
    .pipe(dest('_build'))
}

module.exports = copy
