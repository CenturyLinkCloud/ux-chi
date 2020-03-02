import gulp from 'gulp';

gulp.task('build', gulp.series(
  'clean',
  'build:chi',
  'build:test',
  'build:website',
  'copy:chi:ce-scripts',
  'copy:chi:vue-scripts'
));
