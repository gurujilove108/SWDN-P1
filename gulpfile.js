var gulp = require('gulp');
var browserSync = require("browser-sync");

gulp.task('default', function() {
	browserSync.init(null, {
        proxy: "localhost:8080"
    });

    gulp.watch("static/js/*.js").on('change', browserSync.reload);
    gulp.watch("static/css/*.css").on('change', browserSync.reload);
    gulp.watch("templates/*.html").on('change', browserSync.reload);
});


