const { src, dest, watch, series } = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const terser = require('gulp-terser');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const imagemin = require('gulp-imagemin');
const browsersync = require('browser-sync').create();

// Sass Task
function scssTask() {
	var plugins = [autoprefixer({ Browserslist: ['last 3 version'] })];

	return src('./assets/sass/main.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(postcss(plugins))
		.pipe(dest('./assets/css/'))
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(rename({ extname: '.min.css' }))
		.pipe(dest('./assets/css/'));
}

// Minify img Task
function imagesTask() {
	return src('assets/img/*').pipe(imagemin()).pipe(dest('assets/img/'));
}

// JS Task
function jsTask() {
	return src('assets/js/main.js')
		.pipe(terser())
		.pipe(rename({ extname: '.min.js' }))
		.pipe(dest('assets/js/'));
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
	watch('*.html', { ignoreInitial: false }, browsersyncReload);
	watch('assets/js/main.js', { ignoreInitial: false }, series(jsTask, browsersyncReload));
	watch('./assets/sass/**/*.scss', { ignoreInitial: false }, series(scssTask, browsersyncReload));
}

// Public Gulp task
exports.imagesTask = imagesTask;

// Default Gulp task
exports.default = series(browsersyncServe, watchTask);
