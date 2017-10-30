// Load Gulp first
var gulp = require('gulp');
// Load Packages
var uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    eslint = require('gulp-eslint'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    prettyError = require('gulp-prettyerror'),
    babel = require('gulp-babel');

gulp.task('scripts', ['lint'], function() {
  gulp.src('./js/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./build/js'))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('./build/js'))
});

gulp.task('sass', function () {
  gulp.src('./sass/style.scss')
    .pipe(prettyError())
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('./build/css'))
    .pipe(cssnano())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('watch', function () {
  // compile minified js files automatically
  gulp.watch('js/*.js', ['scripts']);
  gulp.watch('sass/*.scss', ['sass']);
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
});

// gulp.task('babel', function(){
//    gulp.src(['./js/*.js', '!node_modules/**'])
//   .pipe(babel())
//   .pipe(rename('transpilled.js'))
//   .pipe(gulp.dest('./js'));
// });


gulp.task('default', ['scripts', 'sass', 'browser-sync', 'watch'] );