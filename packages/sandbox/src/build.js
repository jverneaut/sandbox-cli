const webpack = require('webpack');
const config = require('./webpack.config');

module.exports = () => {
  webpack(config, (err, stats) => {});
};
