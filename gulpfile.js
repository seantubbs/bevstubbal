var gulp = require('gulp');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var runSequence = require('run-sequence');
var plumber = require('gulp-plumber');
var cssGlobbing = require('gulp-css-globbing');
var notify = require("gulp-notify");
var sourcemaps = require('gulp-sourcemaps');
var inject = require('gulp-inject');
var rename = require('gulp-rename');
var nunjucksRender = require('gulp-nunjucks-render');
var mainBowerFiles = require('main-bower-files');

gulp.task('style', function () {
  return gulp.src('src/less/*.less')
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sourcemaps.init())
      .pipe(less())
      .pipe(autoprefixer('last 2 version'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('style-build', function () {
  return gulp.src('src/less/*.less')
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(less())
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './dist'
    },
  })
});

gulp.task('build-html', function(){
  return gulp.src('./src/*.html')
      .pipe(inject(gulp.src(['./dist/components/jquery.min.js', './dist/components/*.js', './dist/components/*.css', './dist/**/*.js'], {read: false}), { addRootSlash: false, ignorePath: ['/src', '/dist']}))
      .pipe(gulp.dest('./dist/'))
      .pipe(browserSync.reload({
        stream: true
      }));
});

gulp.task('main-bower-files', function(){
  return gulp.src(mainBowerFiles())
    .pipe(gulp.dest('./dist/components'));
});

gulp.task('scripts', function() {
  return gulp.src('src/js/**/*.js')
    //.pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('images', function(){
  return gulp.src('src/img/**/*.+(png|jpg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/img'))
});

gulp.task('pictures', function(){
  return gulp.src('src/pics/**/*.+(png|jpg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/pics'))
});

gulp.task('fonts', function() {
  return gulp.src('src/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
});

gulp.task('cache:clear', function (callback) {
  return cache.clearAll(callback)
});

/////////////////////////////////////////////////
// Finalization tasks
gulp.task('watch', function() {
  // Watch .less files
  gulp.watch('src/less/**/*.less', ['style']);
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('src/*.html', ['build-html']);
  gulp.watch('src/js/**/*.js', ['scripts']);
  gulp.watch('src/pics/**/*', ['pictures']);
  gulp.watch('src/img/**/*', ['images']);
});

gulp.task('build', function (callback) {
  runSequence(['style-build', 'main-bower-files', 'build-html', 'scripts', 'images', 'pictures', 'fonts'],
    callback
  )
});

gulp.task('default', function(callback) {
  runSequence(['style', 'images', 'pictures', 'fonts', 'main-bower-files', 'scripts', 'build-html', 'browserSync', 'watch'], callback)
});

/////////////////////////////////////////////////
// Utils

function onError(err) {
  console.log(err);
  this.emit('end');
}
