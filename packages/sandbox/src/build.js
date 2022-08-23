const webpack = require('webpack');
const config = require('./webpack.config');

module.exports = () => {
  webpack({ ...config, mode: 'production' }, (err, stats) => {
    stats.toString({
      chunks: false,
      colors: true,
    });
  });
};
