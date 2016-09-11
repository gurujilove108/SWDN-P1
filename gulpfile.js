/* Specifying gulp dependencies */
var gulp 		= require('gulp'),

	/* used for reloading changes into the browser on file save to increase decelopment speed */ 
	browserSync = require('browser-sync').create(),

	/* just simplifying the reload browser method*/
	reload 		= browserSync.reload;

	/* used for compressing css files */ 
	cssmin 		= require('gulp-cssmin'),

	/* used for taking the content from one or several files and putting that content into one file */
	concat 		= require('gulp-concat'),

	/* used for compressing javascript, we can use the words minifying and compresssing interchangeably */ 
	uglify		= require('gulp-uglify'),

	/* rimraf is used for deleting files, pretty cool huh! */
	rimraf 		= require('rimraf'),

	/* used for compressing html */
	htmlmin		= require('gulp-htmlmin');

	/* used for properyly minifying angular */
	ngAnnotate 	= require('gulp-ng-annotate');

/* specifying path roots */
var roots = {
	html_root			: 'static/views/',
	js_root  			: 'static/js/',
	css_root 			: 'static/css/',
	templates_root		: 'templates/',
	minified_html_root 	: 'dist/html/',
	minified_js_root 	: 'dist/js/',
	minified_css_root 	: 'dist/css/'
};

/* specifying paths used in tasks */
var paths = { 
	create_event_html   : roots.html_root			+ 'create_event.html',
	signup_html 		: roots.html_root			+ 'signup.html',
  	login_html 			: roots.html_root			+ 'login.html',  	
  	events_html			: roots.html_root			+ 'events.html',
  	html_file_path		: roots.html_root 			+ '*.html',
  	index_html 			: roots.templates_root		+ 'index.html',
  	css_file_path 		: roots.css_root 			+ '*.css',
  	js_file_path  		: roots.js_root 			+ '*.js',
	minhtml_file_path 	: roots.minified_html_root	+ '*.html',
  	minjs_file_path 	: roots.minified_js_root 	+ 'site.min.js',
  	mincss_file_path	: roots.minified_css_root 	+ 'site.min.css',
  	python_file_path 	: './**/*.py'				+ '' 				// just added the + '' to make it look cleaner
};

/* deletes any .min.js files in dist/js */
gulp.task('delete:minjs', function (cb) {
  rimraf(paths.minjs_file_path, cb);
});

/* deletes any .min.css files in dist/css */
gulp.task("delete:mincss", function (cb) {
  rimraf(paths.mincss_file_path, cb);
});

/* deletes any .min.html files in dist/html */
gulp.task("delete:minhtml", function(cb) {
	rimraf(paths.minhtml_file_path, cb);
});

/* this task takes all the js files in static/js/ and minifies them into one file called site.min.js and puts it in paths.minified_js_root which is dist/jss */
gulp.task("minify:js", function () {
	return gulp.src([paths.js_file_path], {base: ".", read: true})  // if read was false this method will not work
		.pipe(concat("site.min.js"))
		.pipe(ngAnnotate())
	    .pipe(uglify())
	    .pipe(gulp.dest(roots.minified_js_root));
});

/* this task does the same thing above except it takes css files from static/css/ and uses cssmin instead of uglify for the compression and puts it in paths.minified_css_root which is dist/css */
gulp.task("minify:css", function () {
	return gulp.src([paths.css_file_path], {base: '.', read: true})
	    .pipe(concat("site.min.css"))
	    .pipe(cssmin())
	    .pipe(gulp.dest(roots.minified_css_root));
});


/*  
 * so far we have uglify() for minifying js, cssmin() for minifying css and htmlmin() for minifying html
 * #Sweet, #Winning, I know gulp know! Yay can't wait to tell my friends that don't know how to use a computer
 * Anyways, unlike css and js, we are minifying html files one to one from non minified to miniied instead of minifying n number of css or js files into one file
 * We have to do it this way because of the way we load in html files opposed to css and js, I'm also excited to see the speed difference in loading the page
 */
gulp.task("minify:index_html", function() {
	return gulp.src([paths.index_html], {base: '.', read: true})
	    .pipe(concat("index.min.html"))
	    .pipe(htmlmin({collapseWhitespace: true}))
	    .pipe(gulp.dest(roots.minified_html_root));
});

gulp.task("minify:create_event_html", function() {
	return gulp.src([paths.create_event_html], {base: '.', read: true})
	    .pipe(concat("create_event.min.html"))
	    .pipe(htmlmin({collapseWhitespace: true}))
	    .pipe(gulp.dest(roots.minified_html_root));
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
	return gulp.src([paths.signup_html], {base: '.', read: true, mangle: false})
	    .pipe(concat("signup.min.html"))
	    .pipe(htmlmin({collapseWhitespace: true}))
	    .pipe(gulp.dest(roots.minified_html_root));
});
/* End minifying html tasks*/

/* this task ensures that the task minify:css is completed before the browser is reloaded */
gulp.task("watch:css", ["minify:css"],  function(done) {
	reload();
	done();
});

/* this task ensures that the task minify:js is completed before the browser is reloaded */
gulp.task("watch:js", ["minify:js"], function(done) {
	reload();
	done();
});

/* 
 * so now that we have the css and js browser reloading after compression we can start defining tasks for our html
 * we could program the task so that when one change is made to one html file, we compress all of them and then 
 * reload the browser, but honestly even though that is much less code, it is stupid and extremely inefficent for development
 * we only have to do that with css and js files because all the files get compressed into one, which is still efficient
 * so what were going to do is create a watch task for each html file, that way its much more efficient
 * files just for reference ["minify:index_html", "minify:create_event_html", "minify:events_html", "minify:login_html", "minify:signup_html"]
*/
gulp.task("watch:index_html", ["minify:index_html"], function(done) {
	reload();
	done();
});

gulp.task("watch:create_event_html", ["minify:create_event_html"], function(done) {
	reload();
	done();
});

gulp.task("watch:events_html", ["minify:events_html"], function(done) {
	reload();
	done();
});

gulp.task("watch:login_html", ["minify:login_html"], function(done) {
	reload();
	done();
});

gulp.task("watch:signup_html", ["minify:signup_html"], function(done) {
	reload();
	done();
});
/* end creating watch html tasks */

gulp.task('serve:dist', function() {

	browserSync.init({
    	proxy: "localhost:8080"
    });

	gulp.watch(paths.css_file_path, 	['watch:css']);
	gulp.watch(paths.js_file_path, 		['watch:js']);
	gulp.watch(paths.index_html, 		['watch:index_html']);
    gulp.watch(paths.create_event_html, ['watch:create_event_html']);
    gulp.watch(paths.events_html, 		['watch:events_html']);
    gulp.watch(paths.login_html, 		['watch:login_html']);
    gulp.watch(paths.signup_html, 		['watch:signup_html']);
});

gulp.task("serve:dev", function() {

	browserSync.init({
    	proxy: "localhost:8080"
    });

    gulp.watch(paths.css_file_path).on('change', reload);
	gulp.watch(paths.js_file_path).on('change', reload);
	gulp.watch(paths.index_html).on('change', reload); 
    gulp.watch(paths.create_event_html).on('change', reload);
    gulp.watch(paths.events_html).on('change', reload); 
    gulp.watch(paths.login_html).on('change', reload); 
    gulp.watch(paths.signup_html).on('change', reload); 
});



/* 
 * Creating tasks that run other tasks 
 * This is extremely useful in my opinion the way this is designed because it is very easy to test
 * I can test every task specifically, all js tasks, all css tasks, all html tasks, or 
 * All tasks together. So far with all the testing I have done, running task_build process works perfectly
 * However these are not being used, just in case I need to test tasks specifically
 */
gulp.task("minify:html", ["minify:index_html", "minify:create_event_html", "minify:events_html", "minify:login_html", "minify:signup_html"]);
gulp.task("delete", ["delete:mincss", "delete:minjs", "delete:minhtml"]);
gulp.task("minify", ["minify:js", "minify:css", "minify:html"]);
gulp.task("build:process", ["delete", "minify"]);
 