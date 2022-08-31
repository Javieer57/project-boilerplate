// Gulp
const { src, dest, watch, series } = require('gulp');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
// Browsersync
const browsersync = require('browser-sync').create();
// Javascript
const babel = require('gulp-babel');
const terser = require('gulp-terser');
// SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

// Sass Task
function sassTask() {
	let plugins = [autoprefixer({ Browserslist: ['last 5 version'] })];

	return src('./assets/sass/styles.scss', { sourcemaps: true })
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(postcss(plugins))
		.pipe(rename({ extname: '.min.css' }))
		.pipe(dest('./assets/dist/css/', { sourcemaps: '.' }));
}

// Minify imgs Task
function imagesTask() {
	return src('./assets/images/*').pipe(imagemin()).pipe(dest('./assets/images/'));
}

// JS Task
function jsTask() {
	return src('./assets/js/**/*.js', { sourcemaps: true })
		.pipe(babel({ presets: ['@babel/preset-env'] }))
		.pipe(terser())
		.pipe(rename({ extname: '.min.js' }))
		.pipe(dest('./assets/dist/js/', { sourcemaps: '.' }));
}

// Browsersync Tasks
function browsersyncServe(cb) {
	browsersync.init({
		server: {
			baseDir: '.',
		},
	});
	cb();
}

function browsersyncReload(cb) {
	browsersync.reload();
	cb();
}

// Watch Task
function watchTask() {
	watch('./*.html', browsersyncReload);
	watch('./assets/js/**/*.js', series(jsTask, browsersyncReload));
	watch('./assets/sass/**/*.scss', series(sassTask, browsersyncReload));
}

// Public Gulp task
exports.imagesTask = imagesTask;

// Default Gulp task
exports.default = series(browsersyncServe, watchTask);
