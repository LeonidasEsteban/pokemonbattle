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


var app = {
  js : {
    src : ['battle.js'],
    dest : './public'
  },
  html : {
    src: ['../index.html']
  },
  stylus : {
    src: ['../stylus/battle.styl'],
    dest: '../css'
  }
};



//js bundle
gulp.task('browserify', watchify(function(watchify) {
    return gulp.src(app.js.src)
        .pipe(watchify({
            watch:watching
        }))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest(app.js.dest))
        .pipe(livereload({auto:true}));
}));
var watching = false;
gulp.task('enable-watch-mode', function() { watching = true; });

gulp.task('watchify', ['enable-watch-mode', 'browserify']);



var nib = require('nib');
// either a String or an Array
gulp.task('stylus', function () {
  gulp.src(app.stylus.src)
    .pipe(stylus({
      compress:true, 
      use: [nib()],
      import: "nib"
    }))
    .pipe(gulp.dest(app.stylus.dest))
    .pipe(livereload({auto:true}));
});

gulp.task('html',function(){
    gulp.src(app.html.src)
        .pipe(livereload({auto:true}));
});

gulp.task('watch',function(){
  livereload.listen();
  gulp.watch(app.stylus.src,['stylus']);
  gulp.watch(app.html.src,['html']);
});


