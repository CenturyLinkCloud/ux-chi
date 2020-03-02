import gulp from 'gulp';
import path from 'path';
import { Folders } from './constants';

const sources = path.join(Folders.SRC, 'vue/dist/**/*');
const destination = path.join(Folders.DIST, 'js/cv');

function copyChiVueScripts () {
  return gulp.src(sources)
    .pipe(gulp.dest(destination));
}

copyChiVueScripts.description = 'Copies vue Chi JavaScript library into dist/js/cv folder. ';

gulp.task('copy:chi:vue-scripts', copyChiVueScripts);
