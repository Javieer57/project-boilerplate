const {src, dest, watch, series} = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const terser = require('gulp-terser');
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const imagemin = require("gulp-imagemin");
const browsersync = require("browser-sync").create();

// Sass Task
function scssTask() {
	var plugins = [
		autoprefixer({ Browserslist: ["last 3 version"]  })
	];

  return src("assets/sass/main.scss", { sourcemaps: true })
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(postcss(plugins))
		.pipe(dest("assets/css", { sourcemaps: '.' }));
}

// Minify img Task
function imagesTask() {
  return src("assets/img/*")
    .pipe(imagemin())
    .pipe(dest("assets/img/"));
}

// JS Task
function jsTask() {
  	return src("assets/js/main.js", { sourcemaps: true })
      .pipe(terser())
      .pipe(dest("assets/js/", { sourcemaps: '.' }));
}

// Browsersync Tasks
function browsersyncServe(cb){
  browsersync.init({
    server: {
      baseDir: '.'
    }
  });
  cb();
}

function browsersyncReload(cb){
  browsersync.reload();
  cb();
}

// Watch Task
function watchTask(){
  watch('*.html', { ignoreInitial: false }, browsersyncReload);
  watch('assets/js/**/*.js', { ignoreInitial: false }, series(jsTask, browsersyncReload));
  watch('assets/sass/**/*.scss', { ignoreInitial: false }, series(scssTask, browsersyncReload));
}

// Public Gulp task
exports.imagesTask = imagesTask;

// Default Gulp task
exports.default = series(
  browsersyncServe,
  watchTask
);