const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/* global __dirname */

module.exports = {
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: 'pug-loader',
      },
    ],
  },
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
