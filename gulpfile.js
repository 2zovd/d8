var syntax        = 'sass'; // Syntax: sass or scss;

var 	gulp          = require('gulp'),
	gutil         = require('gulp-util' ),
	sass          = require('gulp-sass'),
	browserSync   = require('browser-sync'),
	concat        = require('gulp-concat'),
	uglify        = require('gulp-uglify'),
	cleancss      = require('gulp-clean-css'),
	rename        = require('gulp-rename'),
	autoprefixer  = require('gulp-autoprefixer'),
	notify        = require("gulp-notify"),
	rsync         = require('gulp-rsync'),
	svgSprite     = require('gulp-svg-sprite'),
	svgmin        = require('gulp-svgmin'),
	cheerio       = require('gulp-cheerio'),
	replace       = require('gulp-replace');

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
		// open: false,
		// online: false, // Work Offline Without Internet Connection
		// tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
	})
});

gulp.task('styles', function() {
	return gulp.src('themes/custom/beincrypto/'+syntax+'/**/**/*.'+syntax+'')
		.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
		.pipe(rename({ suffix: '.min', prefix : '' }))
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
		.pipe(gulp.dest('themes/custom/beincrypto/css'))
		.pipe(browserSync.stream())
});

gulp.task('js', function() {
	return gulp.src([
		'themes/custom/beincrypto/libs/jquery/dist/jquery.min.js',
		'themes/custom/beincrypto/libs/svg4everybody/dist/svg4everybody.js',
		'themes/custom/beincrypto/js/common.js', // Always at the end
	])
		.pipe(concat('scripts.min.js'))
	// .pipe(uglify()) // Mifify js (opt.)
		.pipe(gulp.dest('themes/custom/beincrypto/js'))
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('rsync', function() {
	return gulp.src('themes/custom/beincrypto/**')
		.pipe(rsync({
		root: 'themes/custom/beincrypto/',
		hostname: 'username@yousite.com',
		destination: 'yousite/public_html/',
		// include: ['*.htaccess'], // Includes files to deploy
		exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excludes files from deploy
		recursive: true,
		archive: true,
		silent: false,
		compress: true
	}))
});

gulp.task('svgSpriteBuild', function () {
	return gulp.src('themes/custom/beincrypto/img/icons/*.svg')
	// minify svg
		.pipe(svgmin({
		js2svg: {
			pretty: true
		}
	}))
	// remove all fill and style declarations in out shapes
//		.pipe(cheerio({
//			run: function ($) {
//				$('[fill]').removeAttr('fill');
//				$('[stroke]').removeAttr('stroke');
//				$('[style]').removeAttr('style');
//			},
//			parserOptions: {xmlMode: true}
//		}))
	// cheerio plugin create unnecessary string '&gt;', so replace it.
		.pipe(replace('&gt;', '>'))
	// build svg sprite
		.pipe(svgSprite({
		mode: {
			symbol: {
				sprite: "../sprite.svg",
				render: {
					scss: {
						dest:'../../../sass/partials/_sprite.scss',
						template: "themes/custom/beincrypto/sass/templates/_sprite_template.scss"
					}
				},
				example: true
			}
		}
	}))
		.pipe(gulp.dest('themes/custom/beincrypto/img/sprite'));
});


gulp.task('watch', ['styles', 'js', 'svgSpriteBuild', 'browser-sync'], function() {
	gulp.watch('themes/custom/beincrypto/'+syntax+'/**/*.'+syntax+'', ['styles']);
	gulp.watch(['libs/**/*.js', 'themes/custom/beincrypto/js/common.js'], ['js']);
	gulp.watch('app/*.html', browserSync.reload)
});


gulp.task('default', ['watch']);
