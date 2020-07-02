var path = require('path');

module.exports = {
  entry: ['babel-polyfill', './src/entrypoint.js'],
  output: {
    path: path.join(__dirname, 'lib'),
    filename: 'ccNetViz.js',
    libraryTarget: 'umd',
  },
  devtool: 'source-map',
  module: {
    rules: [
      // Babel Loader
      {
        exclude: /(node_modules|bower_components)/,
        test: /\.js$/,
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
