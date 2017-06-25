/**
 * Created by meathill on 2017/6/24.
 */

const gulp = require('gulp');
const stylus = require('gulp-stylus');
const cleanCSS = require('gulp-clean-css');
const sequence = require('run-sequence');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const uglify = require('gulp-uglify');
const replace = require('gulp-replace');
const htmlMin = require('gulp-htmlmin');
const imageMin = require('gulp-imagemin');
const del = require('del');
const CDN = require('./cdn.json');

const DOCS = 'docs/';

gulp.task('clear', () => {
  return del(DOCS);
});

gulp.task('stylus', () => {
  gulp.src('./styl/*.styl')
    .pipe(stylus({
      'include css': true
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(gulp.dest(DOCS + 'css/'));
});

gulp.task('webpack', () => {
  return gulp.src('app/*.js')
    .pipe(webpackStream(require('./webpack.config.prod'), webpack))
    .pipe(replace('/dist/', '/js/'))
    .pipe(uglify())
    .pipe(gulp.dest(DOCS + 'js/'));
});

gulp.task('html', () => {
  return gulp.src('./index.html')
    .pipe(replace('dist/', 'js/'))
    .pipe(replace(/node_modules\/([\w\-\.]+)\/(dist|build\/)?/g, (match, repo) => {
      return CDN[repo];
    }))
    .pipe(htmlMin({
      collapseWhitespace: true,
      removeComments: true,
      removeEmptyAttributes: true
    }))
    .pipe(gulp.dest(DOCS));
});

gulp.task('image', () => {
  return gulp.src('img/**')
    .pipe(imageMin())
    .pipe(gulp.dest(DOCS + 'img/'));
});

gulp.task('copy', () => {
  return gulp.src('audio/**')
    .pipe(gulp.dest(DOCS + 'audio/'));
});

gulp.task('default', callback => {
  sequence(
    'clear',
    ['stylus', 'webpack', 'html', 'image', 'copy'],
    callback
  );
});