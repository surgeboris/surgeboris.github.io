const gulp = require('gulp');
const marked = require('gulp-marked');
const concat = require('gulp-concat');
const map = require('map-stream');
const vinylToString = require('vinyl-contents-tostring');

const { throwOnInvalidGulpGlob } = globalRootRequire('helpers/validators');

function getHTML(glob) {
  return new Promise(resolve => {
    throwOnInvalidGulpGlob(glob);
    gulp.src(glob)
      .pipe(marked({
        breaks: true,
        smartypants: true,
      }))
      .pipe(concat('all.html'))
      .pipe(map((file) => (
        vinylToString(file).then((html) => resolve(html))
      )));
  });
}

module.exports = getHTML;
