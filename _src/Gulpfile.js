require('./globals');

const gulp = require('gulp');
const compilePages = require('./gulp-compile-pages');
const clean = require('gulp-clean');
const connect = require('gulp-connect');

gulp.task('default', ['build:pages', 'build:assets', 'serve', 'watch']);

gulp.task('build:pages', ['clean'], () =>
  gulp.src('pages/**/*.html.js')
    .pipe(compilePages())
    .pipe(gulp.dest('../'))
    .pipe(connect.reload())
);

gulp.task('build:assets', ['clean'], () =>
  gulp.src(['assets/**/*'])
    .pipe(gulp.dest('../assets/'))
);

gulp.task('clean', () =>
  gulp.src(['../**/*', '!../{README.md,_src,_src/**,assets,assets/**}'])
    .pipe(clean({ force: true }))
);

gulp.task('serve', () => {
  connect.server({
    livereload: true,
    port: 8000,
    root: '../',
  });
});

gulp.task('watch', () => {
  gulp.watch(['./**', '!./{node_modules,node_modules/**}'], ['build:pages', 'build:assets']);
});
