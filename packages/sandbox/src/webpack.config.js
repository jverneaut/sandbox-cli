const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('@nuxt/friendly-errors-webpack-plugin');

const pages = require('./utils/pages');

const combineObjects = (a, b) => ({ ...a, ...b });

const config = {
  entry: {
    ...pages
      .map((page) => ({
        [[page.slug, 'bundle.js'].join('/')]: page.assets.js,
      }))
      .reduce(combineObjects),
  },

  context: path.resolve(process.cwd(), 'pages'),

  output: {
    path: path.resolve(process.cwd(), 'dist'),
    clean: true,
    filename: '[name]',
  },

  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    ...pages.map(
      (page) =>
        new HtmlWebpackPlugin({
          template: page.path,
          filename: page.filename,
          chunks: [[page.slug, 'bundle.js'].join('/')],
        })
    ),
  ],

  devServer: {
    compress: true,
    hot: true,
    liveReload: true,
    watchFiles: [path.join(process.cwd(), './pages/**/*')],
    // devMiddleware: { writeToDisk: true },
  },

  module: {
    rules: [
      {
        test: /\.twig$/,
        use: [
          {
            loader: 'twig-loader',
            options: {
              twigOptions: {},
            },
          },
          { loader: path.resolve(__dirname, './utils/loader.js') },
          { loader: 'extract-loader' },
          {
            loader: 'html-loader',
            options: {
              esModule: false,
            },
          },
        ],
      },
      { test: /\.md$/, use: ['raw-loader'] },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpeg|png|svg|jpg|gif|svg|ico)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
        ],
      },
    ],
  },
};

module.exports = config;
