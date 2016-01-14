'use strict';

var gulp = require('gulp');

var FILES = [
  './src/assets/fonts',
  './src/assets/vendor'
];

// Copies static assets
gulp.task('copy', function() {
  gulp.src('./src/assets/fonts/**/*')
    .pipe(gulp.dest('./dist/assets/'));
});
