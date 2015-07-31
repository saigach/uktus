var gulp = require('gulp');
var concat           = require('gulp-concat');
var gulpFilter       = require('gulp-filter');
var mainBowerFiles   = require('main-bower-files');

var	compass          = require('gulp-compass'),
	minifycss        = require('gulp-minify-css'),
	uglify           = require('gulp-uglify'),
	rename           = require('gulp-rename'),
	concat           = require('gulp-concat');

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('libs', function () {
    var jsFilter = gulpFilter('*.js');  //отбираем только  javascript файлы
    var cssFilter = gulpFilter('*.css');  //отбираем только css файлы
    return gulp.src(mainBowerFiles())
    // собираем js файлы , склеиваем и отправляем в нужную папку (в моем случае это www/js)
    .pipe(jsFilter)
    .pipe(concat('libs.js'))
    .pipe(gulp.dest('js'))
	.pipe(rename({ suffix: '.min' }))
	.pipe(uglify())
	.pipe(gulp.dest('js'))
    .pipe(cssFilter)
    .pipe(concat('libs.css'))
    .pipe(gulp.dest('css'))
	.pipe(rename({ suffix: '.min' }))
	.pipe(minifycss())
	.pipe(gulp.dest('css')); 
});
 
gulp.task('compass', function() {
  gulp.src('sass/*.scss')
    .pipe(compass({
      config_file: 'config.rb',
      css: 'css',
      sass: 'sass',
	  image: 'img'
    }))
    .pipe(gulp.dest('css'))
	.pipe(rename({ suffix: '.min' }))
	.pipe(minifycss())
	.pipe(gulp.dest('css'));
});

gulp.task('watch', function () {
   //gulp.watch('templates/*.tmpl.html', ['build']);
   gulp.watch('bower.json',['libs']);
   gulp.watch('sass/*.scss', ['compass']);
});

