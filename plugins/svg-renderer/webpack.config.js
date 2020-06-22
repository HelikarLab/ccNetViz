var Webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './main.js',
  output: {
    path: path.join(__dirname, '..', '..', '..', 'lib', 'plugins'),
    filename: 'svg-renderer-plugin.js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules|bower_components/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env'],
        },
      },
    ],
  },
};
