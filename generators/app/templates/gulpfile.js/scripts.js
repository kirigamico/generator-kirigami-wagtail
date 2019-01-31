const WebpackMessages = require('webpack-messages')
const path = require('path')
const webpack = require('webpack')
const {argv} = require('yargs')

const webpackOptions = {
  entry: {
    main: [
      path.resolve('static/scripts/main.js'),
    ]
  },
  mode: argv.prod ? 'production' : 'development',
  output: {
    path: path.resolve('_build/scripts/'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  },
  plugins: [
    new WebpackMessages({
      logger: str => console.log(`>> ${str}`)
    })
  ]
}

if (!argv.prod) {
  webpackOptions.devtool = 'inline-source-map'
}

const compiler = webpack(webpackOptions)

function scripts() {
  return new Promise(resolve => {
    compiler.run(() => resolve())
  })
}

module.exports = {compiler, scripts}
