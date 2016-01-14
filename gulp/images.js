'use strict';

var cache = require('gulp-cache');
var browser = require('browser-sync');
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

gulp.task('watch:images', ['images:cache'], browser.reload)

gulp.task('images:cache', function() {

  return gulp.src('./src/assets/images/**/*')
    .pipe(cache(imagemin({
      // optimizationLevel: 5,
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [pngquant()]
    })))
    .pipe(gulp.dest('./dist/assets/images'));

});

gulp.task('images:build', function() {

  return gulp.src('./src/assets/images/**/*')
    .pipe(imagemin({
      // optimizationLevel: 5,
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('./dist/assets/images'));

});
