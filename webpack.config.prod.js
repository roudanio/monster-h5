/**
 * Created by meathill on 2017/6/25.
 */
const webpack = require('webpack');
const config = require('./webpack.config');

config.watch = false;
config.devtool = false;
config.plugins = [
  new webpack.DefinePlugin({
    BASE_PATH: JSON.stringify('http://qiniu.meathill.com/wukong/')
  })
];

module.exports = config;