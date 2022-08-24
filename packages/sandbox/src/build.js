const webpack = require('webpack');
const sandboxConfig = require('./webpack.config');
const { merge } = require('webpack-merge');
const glob = require('glob');
const path = require('path');

module.exports = () => {
  const clientConfigPath = glob.sync(
    path.join(process.cwd(), 'sandbox.config.js')
  );

  const clientConfig = clientConfigPath.length
    ? require(clientConfigPath[0])
    : {};

  const devConfig = { mode: 'production' };
  const config = merge(sandboxConfig, devConfig, clientConfig.webpack || {});

  webpack(config, (err, stats) => {
    stats.toString({
      chunks: false,
      colors: true,
    });
  });
};
