# Project Boilerplate [GULP + SASS workflow]

-   [English](./README.md)

Este repositorio es un template para agilizar la creación de proyectos frontend ya que integra en un solo comando la compilación de [SASS](https://sass-lang.com/), Javascript y levanta un servidor local con [Browsersync](https://browsersync.io/)

Para lograrlo hace uso del automatizador de tareas [Gulp](https://gulpjs.com/); no obstante, su uso no es obligatorio ya que puedes tomar solo la estructura del proyecto y trabajar con ella.

## Contenido

-   [Instrucciones](#instrucciones)
    -   [Trabajar con Gulp](#trabajar-con-gulp)
    -   [Trabajar sin Gulp](#trabajar-sin-gulp)
-   [Agradecimientos](#agradecimientos)
-   [Autor](#autor)

## Instrucciones

### Trabajar con Gulp

Para trabajar con Gulp es necesario descargar sus dependencias con [npm](https://www.npmjs.com/). El repositorio ya cuenta con el archivo `package.json` por lo que solo tendrás que ejecutar el comando `npm install` para descargarlas (Nota: el archivo `.gitignore` ya ignora la carpeta `node_modules`).

En este apartado también se describen brevemente las funciones de las tareas que se ejecutan con Gulp. Para ejecutarlas solo es necesario ejecutar el comando `gulp` en la terminal.

```
gulp
```

Esto ejecutará dos tareas extras (`browsersyncServe` y `watchTask`). Todo lo que necesitas saber es que la primera abrirá el archivo `index.html` en un nueva ventana de tu navegador y la segunda recargará esa ventana cuando hagas algún cambio en los archivos CSS, JS o HTML.

#### SASS Task

Compila el archivo `styles.scss` de la carpeta scss y lo devuelve comprimido en la carpeta dist, de igual forma agrega los sourcemaps.

`autoprefixer` agrega prefijos para las propiedades CSS que lo necesiten.

```JS
// Sass Task
function scssTask() {
	var plugins = [
		autoprefixer({ Browserslist: ["last 3 version"]  })
	];

  return src("app/scss/styles.scss", { sourcemaps: true })
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(postcss(plugins))
		.pipe(dest("dist", { sourcemaps: '.' }));
}
```

#### JS Task

Compila el archivo `script.js` de la carpeta js y lo devuelve comprimido en la carpeta dist, de igual forma agrega los sourcemaps.

```JS
// JS Task
function jsTask() {
  	return src("app/js/script.js", { sourcemaps: true })
      .pipe(terser())
      .pipe(dest("dist", { sourcemaps: '.' }));
}
```

#### Images Task

La tarea toma todas las imagenes de la carpeta img y las devuelve minificadas en la misma carpeta.

Esta tarea no se ejecuta por defecto con el comando `gulp`. Se mantiene por separado para que solo tengas que ejecutarla cuando lo necesites.

```JS
// Minify img Task
function imagesTask() {
  return src("app/img/*")
    .pipe(imagemin())
    .pipe(dest("app/img"));
}
```

Para ejecutarla se usa el siguiente comando en consola:

```
gulp imagesTask
```

### Trabajar sin Gulp

Si solo quieres utilizar la estructura e ignorar el uso de Gulp puedes borrar todos los archivos fuera de la carpeta app (excepto `index.html`).

Tu respositorio debe quedar con la siguiente estructura:

```
app
    ├───img
    ├───js
        └───script.js
    └───scss
        ├───components
        ├───globals
        ├───util
        └───styles.scss
    └───index.html
```

## Agradecimientos

Para construir este boilerplate me basé en [Crea tu workflow front-end con Gulp.js](https://youtube.com/playlist?list=PLM-Y_YQmMEqBscmoT5y_W91oUnr_D4ulf) de [Wmedia](https://www.youtube.com/c/juanwmedia) y en [Browsersync + Sass + Gulp in 15 minutes](https://youtu.be/q0E1hbcj-NI) de [Coder coder](https://www.youtube.com/c/TheCoderCoder).

La primer link es una lista de reproducción que incluye varios videos que dan las bases para trabajar con Gulp y el segundo es para aprender a usar Gulp de una forma más moderna.

Si quieres aprender más sobre Gulp, esas dos fuentes pueden ser ayuda.

## Autor

-   Frontend Mentor - [@Javieer57](https://www.frontendmentor.io/profile/Javieer57)
-   Github - [@Javieer57](https://github.com/Javieer57)
-   Codepen - [@Javieer57](https://codepen.io/Javieer57)
-   Instagram - [@javieer_eufracio](https://www.instagram.com/javieer_eufracio/)
