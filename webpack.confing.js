const path = require('path');

module.exports = {
  module: {
    rules: {
      test: /\.pug$/,
      loader: 'pug-plain-loader'
    }
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
    }
  }
}
