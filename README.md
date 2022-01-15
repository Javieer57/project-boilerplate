# Project Boilerplate [GULP + SASS workflow]

-   [Español](./README.es.md)

This repository is a template to speed up the creation of frontend projects since it integrates into a single command the compilation of [SASS](https://sass-lang.com/), Javascript and builds a local server with [Browsersync](https://browsersync.io/)

To achieve this, it makes use of the [Gulp](https://gulpjs.com/) task automation; however, its use is not mandatory since you can just take the project structure and work with it.

## Content

-   [Instructions](#instructions)
    -   [Work with Gulp](#work-with-gulp)
    -   [Work without Gulp](#work-without-gulp)
-   [Acknowledgments](#acknowledgments)
-   [Author](#author)

## Instructions

### Work with Gulp

To work with Gulp it is necessary to download its dependencies with [npm](https://www.npmjs.com/). The repository already has the `package.json` file so you will only have to run the `npm install` command to download them (Note: the `.gitignore` file already ignores the `node_modules` folder).

This section also briefly describes the functions of the tasks that run with Gulp. To execute them it is only necessary to execute the `gulp` command in the terminal.

```
gulp
```

This will run two extra tasks (`browsersyncServe` and` watchTask`). All you need to know is that the first will open the `index.html` file in a new browser window and the second will reload that window when you make any changes to the CSS, JS, or HTML files.

#### SASS Task

Compile the file `styles.scss` from the scss folder and return it compressed in the dist folder, also add the sourcemaps.

`autoprefixer` adds prefixes for any CSS properties that need it.

```JS
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
```

#### JS Task

It compiles the `script.js` file from the js folder and returns it compressed in the dist folder, also adds the sourcemaps.

```JS
// JS Task
function jsTask() {
  	return src("assets/js/main.js", { sourcemaps: true })
      .pipe(terser())
      .pipe(dest("assets/js/", { sourcemaps: '.' }));
}
```

#### Images Task

The task takes all the images from the img folder and returns them minified in the same folder.

This task is not executed by default with the `gulp` command. It is kept separate so you only have to run it when you need it.

```JS
// Minify img Task
function imagesTask() {
  return src("assets/img/*")
    .pipe(imagemin())
    .pipe(dest("assets/img/"));
}
```

To execute it, use the following command in the console:

```
gulp imagesTask
```

### Work without Gulp

If you just want to use the structure and ignore the use of Gulp you can delete all the files outside the app folder (except `index.html`).

Your repository should have the following structure:

```
assets
    ├───css
    │   ├───plugin
    │   └───vendor
    ├───fonts
    ├───img
    ├───js
    │   ├───plugin
    │   └───vendor
    ├───php
    └───sass
    │   ├───base
    │   ├───components
    │   ├───layout
    │   └───page
    └───index.html
```

## Acknowledgments

To build this boilerplate I relied on [Crea tu workflow front-end con Gulp.js](https://youtube.com/playlist?list=PLM-Y_YQmMEqBscmoT5y_W91oUnr_D4ulf) from [Wmedia](https://www.youtube.com/c/juanwmedia) and on [Browsersync + Sass + Gulp in 15 minutes](https://youtu.be/q0E1hbcj-NI) from [Coder coder](https://www.youtube.com/c/TheCoderCoder).

The first link is a playlist that includes several videos that provide the basis for working with Gulp and the second is to learn how to use Gulp in a more modern way.

If you want to learn more about Gulp, those two sources can help.

## Author

-   Frontend Mentor - [@Javieer57](https://www.frontendmentor.io/profile/Javieer57)
-   Github - [@Javieer57](https://github.com/Javieer57)
-   Codepen - [@Javieer57](https://codepen.io/Javieer57)
-   Instagram - [@javieer_eufracio](https://www.instagram.com/javieer_eufracio/)
