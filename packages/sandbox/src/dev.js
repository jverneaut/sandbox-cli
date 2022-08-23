const webpack = require('webpack');
const config = require('./webpack.config');
const WebpackDevServer = require('webpack-dev-server');

module.exports = () => {
  const compiler = webpack({ ...config, mode: 'development' });

  const devServerOptions = { ...config.devServer, open: true };
  const server = new WebpackDevServer(devServerOptions, compiler);

  const runServer = async () => {
    console.log('Starting server...');
    await server.start();
  };

  runServer();
};
