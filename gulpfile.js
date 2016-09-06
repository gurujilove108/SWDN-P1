var gulp 			= require('gulp'), 
	browserSync 	= require('browser-sync'), 
	cssmin 			= require('gulp-cssmin'),
	concat 			= require('gulp-concat'), 
	uglify			= require('gulp-uglify'),
	rimraf 			= require('rimraf'),
	htmlmin			= require('gulp-htmlmin'),
	sourcemaps 		= require('gulp-sourcemaps');

var roots = {
	html_root			: 'static/views/',
	js_root  			: 'static/js/',
	css_root 			: 'static/css/',
	templates_root		: 'templates/',
	minified_html_root 	: 'dist/html/',
	minified_js_root 	: 'dist/js/',
	minified_css_root 	: 'dist/css/'
}

var paths = { 

	create_event_html   : roots.html_root			+ 'create_event.html',
	signup_html 		: roots.html_root			+ 'signup.html',
  	login_html 			: roots.html_root			+ 'login.html',  	
  	events_html			: roots.html_root			+ 'events.html',
  	html_file_path		: roots.html_root 			+ '*.html',
  	css_file_path 		: roots.css_root 			+ '*.css',
  	js_file_path  		: roots.js_root 			+ '*.js',
  	python_file_path 	: './**/*.py'				+ '',
  	index_html 			: roots.templates_root		+ 'index.html',
  	create_events_dest  : roots.minified_html_root 	+ 'create_event.min.html',
	signup_dest 		: roots.minified_html_root 	+ 'signup.min.html',
  	login_dest			: roots.minified_html_root 	+ 'login.min.html',   	
  	events_dest			: roots.minified_html_root 	+ 'events.min.html',
  	index_dest 			: roots.minified_html_root 	+ 'dist/html/index.min.html',
	minhtml_file_path 	: roots.minified_html_root	+ '*.html',
  	minjs_file_path 	: roots.minified_js_root 	+ 'site.min.js',
  	mincss_file_path	: roots.minified_css_root 	+ 'site.min.css'
};

gulp.task('watch', function() {
	browserSync.init(null, {
        proxy: "localhost:8080"
    });

	/* js, css, html, and python files when edited then saved, the browser will reload. This helps speed up development */
    gulp.watch(paths.js_file_path).on('change', browserSync.reload);
    gulp.watch(paths.css_file_path).on('change', browserSync.reload);
    gulp.watch(paths.html_file_path).on('change', browserSync.reload);
    gulp.watch(paths.index_html).on('change', browserSync.reload);
    gulp.watch(paths.python_file_path).on('change', browserSync.reload);
});

/* deletes all .min.js files in static/js */
gulp.task('delete:minjs', function (cb) {
  rimraf(paths.minjs_file_path, cb);
});

/* deletes all .min.css files in static/css */
gulp.task("delete:mincss", function (cb) {
  rimraf(paths.mincss_file_path, cb);
});

/* deletes any .min.html files */
gulp.task("delete:minhtml", function(cb) {
	rimraf(paths.minhtml_file_path, cb);
});

/* this task takes all the js files in /static/js/ and minifies them into one file called site.min.js and puts it inminified_js_root */
gulp.task("minify:js", function () {
	gulp.src([paths.js_file_path], {base: ".", read: true})  // if read was false this method will not work
	.pipe(concat("site.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest(roots.minified_js_root))
});

/* this task does the same thing above except it uses cssmin instead of uglify for the compression and puts it in dist/css */
gulp.task("minify:css", function () {
  return gulp.src([paths.css_file_path], {base: '.', read: true})
    .pipe(concat("site.min.css"))
    .pipe(cssmin())
    .pipe(gulp.dest(roots.minified_css_root))
});

gulp.task("minify:index_html", function() {
	return gulp.src([paths.index_html], {base: '.', read: true})
    .pipe(concat("index.min.html"))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(roots.minified_html_root))
});

gulp.task("minify:create_event_html", function() {
	return gulp.src([paths.create_event_html], {base: '.', read: true})
    .pipe(concat("create_event.min.html"))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(roots.minified_html_root))
});

gulp.task("minify:events_html", function() {
	return gulp.src([paths.events_html], {base: '.', read: true})
    .pipe(concat("events.min.html"))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(roots.minified_html_root));
});

gulp.task("minify:login_html", function() {
	return gulp.src([paths.login_html], {base: '.', read: true})
    .pipe(concat("login.min.html"))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(roots.minified_html_root));
});

gulp.task("minify:signup_html", function() {
	return gulp.src([paths.signup_html], {base: '.', read: true})
    .pipe(concat("signup.min.html"))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(roots.minified_html_root));
});


 
// gulp.task('javascript', function() {
//   return gulp.src('src/**/*.js')
//     .pipe(sourcemaps.init())
//       .pipe(concat('all.js'))
//     .pipe(sourcemaps.write())
//     .pipe(gulp.dest('dist'));
// });

gulp.task("minify:html", ["minify:index_html", "minify:create_event_html", "minify:events_html", "minify:login_html", "minify:signup_html"]);
gulp.task("delete", ["delete:mincss", "delete:minjs", "delete:minhtml"]);
gulp.task("minify", ["minify:js", "minify:css", "minify:html"]);
gulp.task("build_process", ["delete", "minify"]);
