var path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    path: path.join(__dirname, '..', '..', '..', 'lib', 'plugins'),
    filename: 'ccNetViz-animation-edge-plugin.js',
    libraryTarget: 'umd',
  },
  mode: 'production', // development
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      // GLSL Loader
      {
        test: /\.glsl$/,
        use: { loader: 'raw-loader' },
      },
    ],
  },
};
