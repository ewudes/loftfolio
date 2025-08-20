const gulp = require("gulp");
const config = require("./env.paths.json");
const env = process.env.NODE_ENV || "production";

const $gp = require("gulp-load-plugins")();
const browserSync = require("browser-sync").create();
const reload = browserSync.reload;
const $webpack = require("webpack-stream");
const webpack = require("webpack");
const del = require("del");

gulp.task("clean", () => {
  return del(config.DIST_DIR, { force: true });
});

gulp.task("styles", () => {
  return gulp
    .src(`${config.SRC_DIR}/styles/main.scss`)
    .pipe($gp.plumber())
    .pipe($gp.postcss(require("./postcss.config")))
    .pipe($gp.rename("main.min.css"))
    .pipe($gp.if(env === "development", $gp.sourcemaps.init()))
    .pipe($gp.if(env === "development", $gp.sourcemaps.write()))
    .pipe(gulp.dest(`${config.DIST_DIR}/assets/css/`))
    .pipe(reload({ stream: true }));
});

gulp.task("scripts", () => {
  return gulp
    .src(`${config.SRC_DIR}/scripts/*.js`)
    .pipe($gp.plumber())
    .pipe($webpack(require("./webpack.mpa.config"), webpack))
    .pipe(gulp.dest(`${config.DIST_DIR}/assets/js/`))
    .pipe(reload({ stream: true }));
});

gulp.task("pug", () => {
  return gulp
    .src(`${config.VIEWS_DIR}/pages/*.pug`)
    .pipe($gp.plumber())
    .pipe($gp.pug({ pretty: true }))
    .pipe(gulp.dest(`${config.DIST_DIR}`))
    .pipe(reload({ stream: true }));
});

gulp.task("images", () => {
  return gulp
    .src([
      `${config.SRC_DIR}/images/**/*.*`,
      `!${config.SRC_DIR}/images/icons/*.*`,
    ])
    .pipe(gulp.dest(`${config.DIST_DIR}/assets/images/`));
});

gulp.task("svg", () => {
  return gulp
    .src(`${config.SRC_DIR}/images/icons/*.svg`)
    .pipe($gp.svgmin({ js2svg: { pretty: true } }))
    .pipe(
      $gp.cheerio({
        run($) {
          $("[fill],[stroke],[style],[width],[height]")
            .removeAttr("fill")
            .removeAttr("stroke")
            .removeAttr("style")
            .removeAttr("width")
            .removeAttr("height");
        },
        parserOptions: { xmlMode: true },
      }),
    )
    .pipe($gp.replace("&gt;", ">"))
    .pipe($gp.svgSprite({ mode: { symbol: { sprite: "../sprite.svg" } } }))
    .pipe(gulp.dest(`${config.DIST_DIR}/assets/images/icons`));
});

gulp.task("fonts", () => {
  return gulp
    .src(`${config.SRC_DIR}/fonts/**`)
    .pipe(gulp.dest(`${config.DIST_DIR}/assets/fonts/`));
});

gulp.task(
  "build",
  gulp.series(
    "clean",
    "svg",
    gulp.parallel("styles", "scripts", "pug", "images", "fonts"),
  ),
);

gulp.task("server", () => {
  browserSync.init({
    server: { baseDir: config.DIST_DIR },
    open: false,
  });
});

gulp.task("watch", () => {
  gulp.watch(`${config.SRC_DIR}/styles/**/*.scss`, gulp.series("styles"));
  gulp.watch(`${config.SRC_DIR}/scripts/**/*.js`, gulp.series("scripts"));
  gulp.watch(`${config.VIEWS_DIR}/**/*.pug`, gulp.series("pug"));
  gulp.watch(`${config.SRC_DIR}/images/**/*.*`, gulp.series("images"));
  gulp.watch(`${config.SRC_DIR}/fonts/*`, gulp.series("fonts"));
});

gulp.task("default", gulp.series("build", gulp.parallel("watch", "server")));
