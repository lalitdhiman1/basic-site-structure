var gulp = require('gulp'), 
    connect = require('gulp-connect'),
    sass = require("gulp-sass"),
    concatCss = require('gulp-concat-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify')
    minify = require('gulp-minify-css'),
    fileinclude = require('gulp-file-include'),
    cleanCSS = require('gulp-clean-css');

gulp.task('minify-css', function() {
  return gulp.src('development/assets/stylesheets/css/**/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('build/assets/css/'));
});

gulp.task('fileinclude', function() {
  gulp.src(['development/**/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('build/'));
});


gulp.task('connect', function() {
  connect.server({
    livereload: true,
    open:true,
    directoryListing: {
  enable: true,
  path: 'build/'
}
  });
});
 
  
gulp.task('html', function() {
	return gulp.src(['development/**/*.html', '!development/includes/**/*.html'])
	.pipe(gulp.dest('build/'));

});

gulp.task("sass", function() {
	return gulp.src('development/assets/stylesheets/sass/**/*.scss')
		.pipe(sass())
		.pipe(concatCss("css.css"))
		.pipe(gulp.dest('development/assets/stylesheets/css/'))
    .pipe(minify())
		.pipe(gulp.dest('build/assets/css/'))
		.pipe(connect.reload());
});



gulp.task('scripts', function() {
	return gulp.src('development/assets/**/*.js')
   .pipe(uglify())
	.pipe(gulp.dest('build/assets/'))
});

gulp.task('watch', function() {
	gulp.watch('development/assets/**/*.scss', ['sass']);
	gulp.watch('development/assets/**/*.js', ['scripts']);
  gulp.watch('development/**/*.html', ['html']);
  gulp.watch('development/**/*.html', ['fileinclude']);
	gulp.watch('development/assets/**/*.css', ['minify-css']);

	
});
	
gulp.task("default", [ 'sass','html','fileinclude','minify-css','scripts','connect', 'watch'])