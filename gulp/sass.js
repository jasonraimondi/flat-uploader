'use strict';

var argv = require('yargs').argv;
var autoprefixer = require('gulp-autoprefixer');
var browser = require('browser-sync');
var fs = require('fs');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var minifycss = require('gulp-minify-css');
var Parker = require('parker/lib/Parker');
var plumber = require('gulp-plumber');
var prettyJSON = require('prettyjson');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

var INCLUDE = [
  'node_modules/foundation-sites/scss',
  'node_modules'
];

var PREFIXES = [
  'last 2 versions',
  'ie >= 9',
  'and_chr >= 2.3'
];

// Compiles Sass files into CSS
gulp.task('sass', ['sass:style']);

// Watch Task
gulp.task('watch:sass', ['sass'], browser.reload);

// Compiles Site Sass
gulp.task('sass:style', function() {
  return gulp.src('./src/assets/sass/style.scss')
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass({
      includePaths: INCLUDE
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: PREFIXES
    }))
    .pipe(rename('style.css'))
    .pipe(gulpif(argv.production, minifycss()))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist/assets/css'));
});

// Audits CSS filesize, selector count, specificity, etc.
gulp.task('sass:audit', ['sass:style'], function(cb) {
  fs.readFile('./dist/assets/css/style.css', function(err, data) {
    var parker = new Parker(require('parker/metrics/All'));
    var results = parker.run(data.toString());
    console.log(prettyJSON.render(results));
    cb();
  });
});
