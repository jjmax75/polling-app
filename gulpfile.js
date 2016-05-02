var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');

function scripts(watch) {
  var bundler = browserify('./src/App.js', {});

  if (watch) {
    bundler.cache = {};
    bundler.packageCache = {};
    bundler = watchify(bundler);
  }

  bundler.on('update', makeBundle);

  bundler.transform('babelify', {presets: ['react', 'es2015']});

  bundler.on('log', function(msg) {console.log('Updated: ' + msg)});

  function makeBundle() {
    bundler.bundle()
      .on('error', function(err) {
        console.error(err.message);
        console.error(err.stack);
        this.emit('end');
      })
      .pipe(source('App.bundle.js'))
      .pipe(gulp.dest('./static/js/'));
  };

  makeBundle();
};

gulp.task('bundle', function(){
  return scripts(false);
});

gulp.task('watch', function(){
  return scripts(true);
});
