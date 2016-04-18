const gulp = require('gulp');
const gulpUtil = require('gulp-util');

const fs = require('fs-extra');
const browserSync = require('browser-sync').create();
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const webpackConfig = require('./webpack.config.js');

const PATHS = webpackConfig.PATHS;

gulp.task('clean', callback => fs.emptyDir(PATHS.dist(), callback));

gulp.task('serve', [ 'clean' ], () => {
  const bundler = webpack(webpackConfig);
  browserSync.init({
    baseDir: PATHS.src(),

    middleware: [
      webpackDevMiddleware(bundler, {
        publicPath: webpackConfig.output.publicPath,
        stats: webpackConfig.stats,
        noInfo: webpackConfig.stats,
      }),

      webpackHotMiddleware(bundler),
    ],
  });
});

gulp.task('bundle', [ 'clean' ], callback => {
  webpack(webpackConfig, (err, stats) => {
    if (err) throw new gulpUtil.PluginError('webpack', err);

    gulpUtil.log('[webpack]', stats.toString(webpackConfig.stats));

    callback();
  });
});

gulp.task('start', [ 'clean', 'serve' ]);
gulp.task('build', [ 'clean', 'bundle' ]);

gulp.task('default', [ 'start' ]);
