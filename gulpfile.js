var gulp = require('gulp'); // loads gulp 
var uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  browserSync = require('browser-sync'),
  eslint = require('gulp-eslint'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  cssnano = require('gulp-cssnano'),
  prettyError = require('gulp-prettyerror');
//
gulp.task('sass', function() {
  gulp.src('./sass/style.scss')
     .pipe(prettyError())//handles error before running
     .pipe(sass())
     .pipe(autoprefixer({
        browsers: ['last 2 versions']
     }))
     .pipe(gulp.dest('./build/css'))
     .pipe(cssnano())
     .pipe(rename('style.min.css'))
     .pipe(gulp.dest('./build/css'));
});

gulp.task('scripts',['lint'], function () {
  gulp.src('./js/*.js') // What files do we want gulp to consume?
    .pipe(uglify()) // Call the uglify function on these files
    .pipe(rename({ extname: '.min.js' })) // Rename uglified file
    .pipe(gulp.dest('./build/js')) //dist uglified file to/build/js
});

gulp.task('lint', function () {
  return gulp.src(['./js/*.js','!node_modules/**'])
  .pipe(eslint())
  .pipe(eslint.format()) 
  .pipe(eslint.failAfterError());
});

gulp.task('watch', function () {
  gulp.watch('sass/*.scss',['sass']);
  gulp.watch('js/*.js', ['scripts']);
});

gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch(['*.html', 'build/css/*.css', 'build/js/*.js']).on('change', browserSync.reload);
});

// Modify our default task method by passing an array of task names
gulp.task('default', ['watch', 'browser-sync']);

