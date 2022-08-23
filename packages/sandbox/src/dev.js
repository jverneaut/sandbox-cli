const webpack = require('webpack');
const sandboxConfig = require('./webpack.config');
const WebpackDevServer = require('webpack-dev-server');
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

  const devConfig = { mode: 'development' };
  const config = merge(sandboxConfig, devConfig, clientConfig.webpack || {});

  try {
    const compiler = webpack(config);

    const devServerOptions = { ...config.devServer, open: true };
    const server = new WebpackDevServer(devServerOptions, compiler);

    const runServer = async () => {
      console.log('Starting server...');
      await server.start();
    };

    runServer();
  } catch (err) {
    throw new Error(err);
  }
};
