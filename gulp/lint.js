'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var scssLint = require('gulp-scss-lint');

// Lints Sass and JavaScript files for formatting issues
gulp.task('lint', ['lint:sass', 'lint:javascript']);

gulp.task('lint:sass', function() {
  return gulp.src('./src/assets/sass/**/*.scss')
    .pipe(scssLint({
      'config': './scss-lint.yml'
    }));
});

gulp.task('lint:javascript', function() {
  jshint.lookup = false;

  return gulp.src('./src/assets/js/*.js')
    .pipe(jshint('./.jshintConfig'))
    .pipe(jshint.reporter('default'));
});
