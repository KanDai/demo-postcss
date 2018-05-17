const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssDeclarationSorter = require('css-declaration-sorter');
const mqpacker = require("css-mqpacker");
const cssnano = require("cssnano");
const stylelint = require('stylelint');
const reporter = require('postcss-reporter');

gulp.task('css', function () {

  const plugin = [
    autoprefixer({
      browsers: [
        'last 2 versions'
      ]
    }),
    cssDeclarationSorter({
      order: 'smacss'
    }),
    mqpacker(),
    cssnano({ autoprefixer: false })
  ];

  return gulp.src('./src/*.scss')
    .pipe(postcss([
      stylelint(),
      reporter()
    ]))
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(postcss(plugin))
    .pipe(gulp.dest('./dest/'));
});

