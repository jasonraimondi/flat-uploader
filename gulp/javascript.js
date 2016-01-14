'use strict';

var argv = require('yargs').argv;
var browser = require('browser-sync');
var concat = require('gulp-concat');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

var VENDOR = [
    'node_modules/jquery/dist/jquery.js',
    'node_modules/jquery-form/jquery.form.js',
    'node_modules/foundation-sites/js/foundation.core.js',
    // 'node_modules/foundation-sites/js/foundation.abide.js',
    // 'node_modules/foundation-sites/js/foundation.accordion.js',
    // 'node_modules/foundation-sites/js/foundation.accordionMenu.js',
    // 'node_modules/foundation-sites/js/foundation.drilldown.js',
    // 'node_modules/foundation-sites/js/foundation.dropdown.js',
    // 'node_modules/foundation-sites/js/foundation.dropdownMenu.js',
    // 'node_modules/foundation-sites/js/foundation.equalizer.js',
    // 'node_modules/foundation-sites/js/foundation.interchange.js',
    // 'node_modules/foundation-sites/js/foundation.magellan.js',
    // 'node_modules/foundation-sites/js/foundation.offcanvas.js',
    // 'node_modules/foundation-sites/js/foundation.orbit.js',
    // 'node_modules/foundation-sites/js/foundation.responsiveMenu.js',
    'node_modules/foundation-sites/js/foundation.responsiveToggle.js',
    // 'node_modules/foundation-sites/js/foundation.reveal.js',
    // 'node_modules/foundation-sites/js/foundation.slider.js',
    // 'node_modules/foundation-sites/js/foundation.sticky.js',
    // 'node_modules/foundation-sites/js/foundation.tabs.js',
    // 'node_modules/foundation-sites/js/foundation.toggler.js',
    // 'node_modules/foundation-sites/js/foundation.tooltip.js',
    // 'node_modules/foundation-sites/js/foundation.util.box.js',
    // 'node_modules/foundation-sites/js/foundation.util.keyboard.js',
    'node_modules/foundation-sites/js/foundation.util.mediaQuery.js',
    // 'node_modules/foundation-sites/js/foundation.util.motion.js',
    // 'node_modules/foundation-sites/js/foundation.util.nest.js',
    // 'node_modules/foundation-sites/js/foundation.util.timerAndImageLoader.js',
    // 'node_modules/foundation-sites/js/foundation.util.touch.js',
    // 'node_modules/foundation-sites/js/foundation.util.triggers.js',
    '/node_modules/motion-ui/motion-ui.js'
];

var APP = [
    './src/assets/js/app.js'
];

// Compiles JavaScript into a single file
gulp.task('javascript', ['javascript:vendor', 'javascript:app']);

// Watch task
gulp.task('watch:javascript', ['javascript:app'], browser.reload)

gulp.task('javascript:vendor', function() {
    return gulp.src(VENDOR)
        .pipe(sourcemaps.init())
        .pipe(concat('vendor.js'))
        .pipe(gulpif(argv.production, uglify()))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist/assets/js'));
});

gulp.task('javascript:app', function() {
    return gulp.src(APP)
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(gulpif(argv.production, uglify()))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist/assets/js'));
});
