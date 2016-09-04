var gulp 			= require('gulp'), 
	browserSync 	= require('browser-sync'), 
	cssmin 			= require('gulp-cssmin'),
	concat 			= require('gulp-concat'), 
	uglify			= require('gulp-uglify'),
	rimraf 			= require('rimraf');

var paths = {
  templates_root   				: 'templates/',
  js_root						: 'static/js/',
  index_html 					: 'templates/index.html',
  js_file_path		 			: 'static/js/*.js',
  css_file_path 				: 'static/css/*.css',
  views_file_path	 			: 'static/views/*.html',
  min_js_file_path 				: 'static/js/*.min.js',
  min_css_file_path				: 'static/css/*.min.css',
  destination_jsmin_filepath 	: 'static/js/site.min.js',
  destination_jscss_filepath  	: 'static/css/site.min.css'
};

gulp.task('watch', function() {
	browserSync.init(null, {
        proxy: "localhost:8080"
    });

    gulp.watch("static/js/*.js").on('change', browserSync.reload);
    gulp.watch("static/css/*.css").on('change', browserSync.reload);
    gulp.watch("static/views/*.html").on('change', browserSync.reload);
    gulp.watch("templates/*.html").on('change', browserSync.reload);

});

/* deletes all .min.js files in static/js */
gulp.task('delete:minjs', function (cb) {
  rimraf(paths.min_js_file_path, cb);
});

/* deletes all .min.css files in static/css */
gulp.task("delete:mincss", function (cb) {
  rimraf(paths.min_css_file_path, cb);
});

/* 
 * Here we declare a task that runs two other tasks, that way we can accomplish n number of tasks with one task
 * Coolest thing right, a task that calls an array of tasks
 * One of my concerns as a programmer is that I already have a tool to delete certain files
 * The tool is powershell or a terminal and you could just run rm *.min.css or rm *.min.js or even
 * create a powershell or bash function to do it
*/
gulp.task("delete:js:css:min", ["delete:minjs", "delete:mincss"]);


gulp.task("minify:js", function () {
  return gulp.src([paths.js_file_path, "!" + paths.min_js_file_path], { base: "." })
    .pipe(concat(paths.destination_jsmin_filepath))
    .pipe(uglify())
    .pipe(gulp.dest("."));
});

// gulp.task("min:css", function () {
//   return gulp.src([paths.css, "!" + paths.min_css_file_path])
//     .pipe(concat(paths.))
//     .pipe(cssmin())
//     .pipe(gulp.dest());
// });

gulp.task("minify", ["min:js", "min:css"]);


         