const gulp = require('gulp');
const stylus = require('gulp-stylus');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const map = require('map-stream');
const vinylToString = require('vinyl-contents-tostring');

const { throwOnInvalidGulpGlob } = globalRootRequire('helpers/validators');

function getCSS(glob) {
  return new Promise(resolve => {
    throwOnInvalidGulpGlob(glob);
    gulp.src(glob)
      .pipe(stylus({
        'include css': true,
      }))
      .pipe(concat('all.css'))
      .pipe(autoprefixer({
        cascade: false,
      }))
      .pipe(cleanCss())
      .pipe(map((file) => (
        vinylToString(file).then((css) => resolve(css))
      )));
  });
}

module.exports = getCSS;
