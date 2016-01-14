'use strict';

var del = require('del');
var gulp = require('gulp');

var DELETE = [
  './dist'
];

gulp.task('clean:sass', function(cb) {
  del(['./dist/assets/css'], cb);
});

gulp.task('clean:javascript', function(cb) {
  del(['./dist/assets/js'], cb);
});
