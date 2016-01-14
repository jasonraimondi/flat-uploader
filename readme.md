# Templater

NOTE: I am on Node version 5.1.1

Starter gulpfile.js and package.json for building web apps using [Gulp.js](http://gulpjs.com/). It can be used as a starter template or can be used to build out HTML/CSS templates using Jade. All options are modular and can be used together or a la cart.

A brief overview of what is bundled:

* gulp (duh)
* sass
* javascript uglify / concat
* browserify
* jade
* linter
* copy
* clean
* server (browsersync)

## Getting Started

#### Install dependencies:

```bash
$ npm install -g gulp
$ npm install
```

#### Configure:
Inside of the `./gulp` directory you will find all the individual gulp tasks and their configurations.

```bash
$ git clone https://github.com/jasonraimondi/templater
$ npm install
```


---

## Usage
This comes loaded with most of the basic gulp functionality ready to go.

### Main Tasks

#### Default
```bash
$ gulp
or
$ gulp --production
```
Build project with **CACHED** images the current project from the `src` to the `dist` directory in the following order:
1. gulp sass
2. gulp browserify
3. gulp templates
4. gulp imagecache



#### Build
```bash
$ gulp build
or
$ gulp build --production
```
Build project and reprocess all images the current project from the `./src` to the `./dist` directory in the following order:
1. gulp sass
2. gulp browserify
3. gulp templates
4. gulp imagebuild


#### Serve
```bash
$ gulp serve
or
$ gulp serve --production
```
Start a browserify session and load the `./dist` in the default browser. Automatically watch files for changes and reload assets when they change.

#### Watch
```bash
$ gulp watch
or
$ gulp watch --production
```
Automatically watch files for changes and reprocess assets when they change.

#### Clean
```bash
$ gulp clean
```
Delete the `./dist` directory.

---

### Styles
The project comes with SASS, Autoprefixer and Sourcemaps ready to go. Everything works with the `--production` flag.

```bash
$ gulp sass
or
$ gulp sass --production
```
Default run of sass styles

#### Audit Sass

```bash
$ gulp sass:audit
```
Uses [Parker](https://github.com/katiefenn/parker) to audit sass files.  Parker is a stylesheet analysis tool. It runs metrics on your stylesheets and will report on their complexity.

---

### Scripts
The project comes with both the traditional Javascript tasks of Uglify,  Concat and Sourcemaps (under the 'javascript' namespace) and also Browserify. Everything works with the `--production` flag.

```bash
$ gulp javascript
or
$ gulp javascript --production
```
Traditional Javascript tasks of Uglify and Concat.

#### Browserify

```bash
$ gulp browserify
or
$ gulp browserify --production
```
Traditional Javascript tasks of Uglify and Concat.

---

### Linter
The project comes with both SASS and JS linters.

#### Default Lint
```bash
$ gulp lint
```
Runs both the Sass and JS linter.

#### Lint Sass
```bash
$ gulp lint:sass
```

#### Lint Javascript
```bash
$ gulp lint:javascript
```



---

### Known Issues
* For some reason RVM screwed up my linter, so I needed to rerun 'gem install bundler' and 'gem install scss-lint' in order to fix the linter.
