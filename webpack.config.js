'use strict';
const path = require('path');

const IS_PRODUCTION = require('./env').IS_PRODUCTION;

const entryPoints = {
  crows: path.resolve(__dirname, 'src/js/crows.js'),
  snow: path.resolve(__dirname, 'src/js/snow.js'),
  abstraction: path.resolve(__dirname, 'src/js/abstraction.js'),
  perlin: path.resolve(__dirname, 'src/js/perlin.js'),
  abstraction2: path.resolve(__dirname, 'src/js/abstraction2.js'),
};

module.exports = {
  entry: Object.keys(entryPoints).reduce((acc, currentKey) => {
    acc[currentKey] = [entryPoints[currentKey]];
    return acc;
  }, {}),
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/js'),
    publicPath: '/js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
      },
    ],
  },
  devtool: IS_PRODUCTION ? undefined : 'eval',
  mode: IS_PRODUCTION ? 'production' : 'development',
  optimization: {
    minimize: IS_PRODUCTION,
  },
};
