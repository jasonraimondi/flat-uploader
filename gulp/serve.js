'use strict';

var gulp = require('gulp');
var browser = require('browser-sync');

// Starts a BrowerSync instance
gulp.task('serve', ['default'], function() {

  browser.init({
    proxy : "eventfarm.app",
    notify: false
  });

  gulp.watch('./src/assets/images/**/*', ['watch:images']);
  gulp.watch('./src/assets/sass/**/*', ['watch:sass']);
  gulp.watch('./src/assets/js/**/*', ['watch:javascript']);
  gulp.watch('./src/views/**/*', ['templates']);
  gulp.watch('./dist/**/*.html', browser.reload);

});
