const path = require('path');
const { cwd } = require('node:process');

const basePath = cwd();

module.exports = {
  entry: path.resolve(basePath, 'index.js'),
  output: {
    path: path.resolve(basePath, 'dist'),
    filename: 'bundle.js',
  },
};
