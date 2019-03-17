var gulp = require('gulp')
var imagemin = require('gulp-imagemin')
var del = require('del')
var usemin = require('gulp-usemin')
var rev = require('gulp-rev')
var cssnano = require('gulp-cssnano')
var uglify = require('gulp-uglify')
var browserSync = require('browser-sync').create()

gulp.task('previewDocs', function() {
	browserSync.init({
		notify: false,
		host: '192.168.0.2',
		server: {

			baseDir: "docs"
		}
	})
})

gulp.task('deleteDocs', ['icons'], function() {
	return del('./docs')
})

gulp.task('copyGeneralFiles', ['deleteDocs'], function() {
	var pathsToCopy = [
	'.app/**/*',
	'!./app/index.html',
	'!./app/assets/images/**',
	'!./app/assets/styles/**',
	'!./app/assets/scripts**',
	'!./app/temp',
	'!./app/temp/**'
	]
	return gulp.src(pathsToCopy)
	.pipe(gulp.dest('./docs'))
})

gulp.task('optimizeImages', ['deleteDocs'], function() {
	return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])
	.pipe(imagemin({
		progressive: true,
		interlaced: true,
		multipass: true
	}))
	.pipe(gulp.dest('./docs/assets/images'))
})

gulp.task('useminTrigger', ['deleteDocs'], function() {
	gulp.start('usemin')
})

gulp.task('usemin', ['styles', 'scripts'], function() {
	return gulp.src('./app/index.html')
	.pipe(usemin({
		css: [function() {return rev()}, function() {return cssnano()}],
		js: [function() {return rev()}, function() {return uglify()}]
	}))
	.pipe(gulp.dest('./docs'))
})

gulp.task('build', ['deleteDocs', 'copyGeneralFiles', 'optimizeImages', 'useminTrigger']);