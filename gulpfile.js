var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');

var config = {
  devPath: './app/',
  publicPath: './public/',
  jsDir: 'js/',
  cssDir: 'css/'
};

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    }
  });
});

gulp.task('sass', function() {
  return gulp
    .src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss
    .pipe(sass().on('error', sass.logError))
    .pipe(
      autoprefixer({
        browsers: ['last 4 versions'],
        cascade: false
      })
    )
    .pipe(gulp.dest('app/css'))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

gulp.task('useref', function() {
  var files = [
    config.devPath + '*.html',
    config.publicPath + config.jsDir + '*.js',
    config.publicPath + config.cssDir + '*.css'
  ];
  var destDir = config.publicPath;

  return (
    gulp
      .src(files)
      // Run useref only if it’s an HTML file
      .pipe(gulpIf('*.html', useref()))
      // Minifies only if it's a JavaScript file
      .pipe(gulpIf('*.js', uglify()))
      // Minifies only if it's a CSS file
      .pipe(gulpIf('*.css', cleanCSS()))
      .pipe(gulp.dest(destDir))
      .pipe(
        browserSync.reload({
          stream: true
        })
      )
  );
});

// Compress all images and move them to /public/images
gulp.task('images', function() {
  return (
    gulp
      .src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
      // Caching images that ran through imagemin
      .pipe(
        cache(
          imagemin({
            interlaced: true
          })
        )
      )
      .pipe(gulp.dest('public/images'))
  );
});

// Moves all fonts into /public folder
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*').pipe(gulp.dest('public/fonts'));
});

// Gulp will delete the `public` folder for you whenever gulp clean:public is run.
gulp.task('clean:public', function() {
  return del.sync('public');
});

gulp.task('watch', ['browser-sync', 'sass'], function() {
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('build', function(callback) {
  runSequence('clean:public', ['sass', 'useref', 'images', 'fonts'], callback);
});

gulp.task('default', function(callback) {
  runSequence(['sass', 'browser-sync', 'watch'], callback);
});
