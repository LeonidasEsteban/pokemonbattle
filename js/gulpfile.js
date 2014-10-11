var gulp        = require('gulp'),
    uglify      = require('gulp-uglify'),
    changed     = require('gulp-changed'),
    imagemin    = require('gulp-imagemin'),
    stripDebug  = require('gulp-strip-debug'),
    minifyCSS   = require('gulp-minify-css'),
    minifyHTML  = require('gulp-minify-html'),
    browserify  = require('gulp-browserify'),
    watchify  = require('gulp-watchify'),
    streamify = require('gulp-streamify'),
    stylus = require('gulp-stylus'),
    livereload = require('gulp-livereload');

//js bundle
gulp.task('browserify', watchify(function(watchify) {
    return gulp.src('battle.js')
        .pipe(watchify({
            watch:watching
        }))
        // .pipe(streamify(uglify()))
        .pipe(gulp.dest('./public'))
        .pipe(livereload({auto:true}));
}));
var watching = false;
gulp.task('enable-watch-mode', function() { watching = true; });

gulp.task('watchify', ['enable-watch-mode', 'browserify']);



var nib = require('nib');
// either a String or an Array
gulp.task('stylus', function () {
  gulp.src('../stylus/battle.styl')
    .pipe(stylus({compress:true, use: [nib()]}))
    .pipe(gulp.dest('../css'))
    .pipe(livereload({auto:true}));
});

gulp.task('watch',function(){
  livereload.listen();
  gulp.watch('../stylus/*.styl',['stylus']);
});

// Default gulp task to run
// gulp.task('stylus', []);



gulp.task('js', function () {
  gulp.src('battle.js')
    .pipe(uglify({ compress: true }))
    .pipe(stripDebug())
    .pipe(gulp.dest('./public'));
});



gulp.task('css', function () {
  gulp.src('app/css/**/*.css')
    .pipe(minifyCSS({ keepSpecialComments: '*', keepBreaks: '*'}))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('images', function () {
  var imgSrc = './app/img/**/*',
      imgDst = './public/img';

  gulp.src('app/img/**/*')
    .pipe(changed(imgDst))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDst));
});

gulp.task('html', function () {
  var htmlSrc = './app/*.html',
      htmlDst = './public';

  gulp.src(htmlSrc)
  .pipe(minifyHTML())
  .pipe(gulp.dest(htmlDst));
});

gulp.task('fonts', function () {
  gulp.src('app/fonts/**')
    .pipe(gulp.dest('./public/fonts'));
});

gulp.task('data', function () {
   gulp.src('app/data.json')
    .pipe(gulp.dest('./public'));
});

gulp.task('default', [ 'js', 'css', 'images', 'html', 'fonts', 'data' ,'stylus', 'watch']);