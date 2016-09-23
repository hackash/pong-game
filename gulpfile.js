var gulp = require('gulp'),
  webserver = require('gulp-webserver'),
  connect = require('gulp-connect'),
  livereload = require('gulp-livereload');

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch(['./app/scripts/**/*.js'], ['reload']);
});

gulp.task('reload', function () {
    livereload.reload();
});

gulp.task('webserver', function () {
    connect.server({
        livereload: true,
        port: 3242,
        root: 'app'
    });
});

gulp.task('default', ['webserver', 'watch']);