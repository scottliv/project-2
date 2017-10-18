// Load Gulp first
var gulp = require('gulp');
// Load Packages
var uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    eslint = require('gulp-eslint');

gulp.task('scripts', ['lint'], function() {
  gulp.src('./js/*.js')
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('./build/js'))
});

gulp.task('watch', function () {
  // compile minified js files automatically
  gulp.watch('js/*.js', ['scripts']);
});

gulp.task('browser-sync', function(){
  // initialize local server from root directory
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  // watch build files for change and reload the browser when a file is changed
  gulp.watch(['*.html', 'build/css/*.css', 'build/js/*.js']).on('change', browserSync.reload);
});

gulp.task('lint', function(){
  gulp.src(['./js/*.js', '!node_modules/**'])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
})


gulp.task('default', ['scripts', 'browser-sync', 'watch'] );