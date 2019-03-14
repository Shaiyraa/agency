var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create()

gulp.task('watch', function() {

	browserSync.init({
		notify: false,
		host: '192.168.0.2',
		server: {

			baseDir: "app"
		}
	})

	watch('./app/index.html', function() {
		browserSync.reload()
	})

	watch('./app/assets/styles/**/*.css', function() {
		gulp.start('cssInject')
	})

	watch('./app/assets/scripts/**/*.js', function() {
		gulp.start('scriptsRefresh')
	})
})

gulp.task('cssInject', ['styles'], function() {
	return gulp.src('./app/temp/styles/styles.css')
	.pipe(browserSync.stream())
})

gulp.task('scriptsRefresh', ['scripts'], function() {
	return gulp.src('./app/temp/scripts/App.js')
	.pipe(browserSync.stream())
})