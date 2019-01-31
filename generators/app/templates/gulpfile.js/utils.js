const plumber = require('gulp-plumber')

exports.plumbing = () => plumber({
  errorHandler: function (error) {
    console.log(error.message)
    this.emit('end')
  }
})
