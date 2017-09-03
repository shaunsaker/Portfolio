// Dependencies
var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');  
var rename = require('gulp-rename');  
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var gutil = require('gulp-util');
var webp = require('gulp-webp');

// Paths
var sassFiles = 'app/**/*.scss',
	jsFiles = ['app/**/*.js', '!app/lib/**/*.js', '!app/**/*.min.js', '!app/lib/**/*'],
	jsxFiles = 'app/**/*.jsx',
	htmlFiles = 'app/**/*.html',
	images = ['app/**/*.png', 'app/**/*.jpg', 'app/**/*.gif'];

gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: 'app'
		}
	})
});
 
// Convert our SCSS files to CSS and minify
gulp.task('styles', function() {
	return gulp.src(sassFiles, { base: '.' })
		.pipe(sass().on('error', sass.logError))
 		.pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
		.pipe(rename(function (path) {
			path.dirname = path.dirname.replace('\sass', '\css');
			path.extname = ".min.css";
		})) 
		.pipe(cleanCSS())
		.pipe(gulp.dest('.'))
	    .pipe(browserSync.reload({
	      stream: true
	    }));
});

// Concatenate our stylesheets
gulp.task('styles-concat', function() {
	return gulp.src(['./app/css/lib/bootstrap.min.css', './app/css/lib/font-awesome.min.css', './app/css/style.min.css'], { base: '.' })
		.pipe(concat('./app/css/styles.min.css'))
		.pipe(gulp.dest('.'));
});

// Minify js files
gulp.task('scripts', function() {
	return gulp.src(jsFiles, { base : '.'})
		.pipe(rename(function (path) {
			path.extname = ".min.js";
		})) 
		.pipe(uglify())
		.pipe(gulp.dest('.'))
	    .pipe(browserSync.reload({
	      stream: true
	    }));
});

// Concatenate our scripts
gulp.task('scripts-concat', function() {
	return gulp.src(['./app/js/lib/jquery.min.js', './app/js/lib/bootstrap.min.js', './app/js/app.min.js'], { base: '.' })
		.pipe(concat('./app/js/scripts.min.js'))
		.pipe(gulp.dest('.'));
});

// Compress images to webp format
gulp.task('images', function() {
	return gulp.src(images, { base : '.'})
		.pipe(webp({
			method: 6
		}))
		.pipe(gulp.dest('.'));
});

// Build task for deployment
gulp.task('build', ['images', 'styles', 'styles-concat', 'scripts', 'scripts-concat'], function() {

});

// Watch our files for changes during development
gulp.task('watch', ['styles', 'styles-concat', 'scripts', 'scripts-concat', 'browserSync'], function() {
	gulp.watch(sassFiles, ['styles', 'styles-concat']);
	gulp.watch(jsFiles, ['scripts', 'scripts-concat']);
	gulp.watch(jsxFiles, browserSync.reload);
	gulp.watch(htmlFiles, browserSync.reload);
});