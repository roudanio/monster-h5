const path = require('path');
const webpack = require('webpack');
const CopyWebapckPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const dev = require('./config/dev');

/* global __dirname */

module.exports = {
  entry: {
    preloader: path.resolve(__dirname, './src/preloader.js'),
    main: path.resolve(__dirname, './src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[hash].js',
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
  devtool: 'sourcemap',
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.pug",
      templateParameters: {
        mode: 'dev',
      },
    }),
    new webpack.DefinePlugin(dev),
    new WriteFilePlugin({
      test: /\.jpg|png$/,
    }),
    new CopyWebapckPlugin([
      {
        from: 'img',
        to: 'img',
        toType: 'dir',
      },
    ])
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 8082,
  },
};
