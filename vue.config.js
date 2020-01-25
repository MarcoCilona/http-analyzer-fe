const path = require('path');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/http-analyzer-fe/'
    : '/',
    chainWebpack: (config) => {
      config.resolve.alias
        .set('src', path.resolve(__dirname, 'src'));
    },
};
