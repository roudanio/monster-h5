const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/* global __dirname */

module.exports = {
  entry: {
    preloader: path.resolve(__dirname, './src/preloader.js'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].hash.js',
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: 'pug-loader',
      },
      {
        test: /\.styl(us)?$/,
        use: [
          'style-loader',
          'css-loader',
          'stylus-loader',
        ],
      },
    ],
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.pug",
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 8082,
  },
};
