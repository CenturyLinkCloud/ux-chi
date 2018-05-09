import path from 'path';

import del from 'del';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import gulp from 'gulp';
import metalsmith from 'metalsmith';
import metalsmithInlineSource from 'metalsmith-inline-source';
import metalsmithLayouts from 'metalsmith-layouts';
import metalsmithPug from 'metalsmith-pug';
import runSequence from 'run-sequence';
import * as chi from '../scripts/chi';

const plugins = require('gulp-load-plugins')();
const publicFolder = 'public';
const rootFolder = path.join(__dirname, '..');

gulp.task('test-clean', done =>
  del([path.join(rootFolder, publicFolder)], done));

gulp.task('test-build-html', () => {
  const promise = new Promise((resolve, reject) => {
    metalsmith(rootFolder)
      .source('test/css')
      .destination(publicFolder)
      .clean(false)
      .use(metalsmithPug({
        doctype: 'html'
      }))
      .use(metalsmithInlineSource())
      .use(metalsmithLayouts({
        default: 'test.pug',
        directory: path.join(rootFolder, 'test', 'layouts'),
        doctype: 'html',
        engine: 'pug',
        pattern: '**/*.html'
      }))

      .build(error => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
  });

  promise.then(() => {
    gulp.src(`${publicFolder}/**/*.html`)
      .pipe(plugins.wait(1500))
      .pipe(plugins.connect.reload());
  });

  return promise;
});

gulp.task('test-build-css', () =>
  gulp.src(path.join(rootFolder, 'test', 'css', '**', '*.scss'))
    .pipe(plugins.plumber())
    .pipe(plugins.sass({
      includePaths: [
        'node_modules',
        path.join(rootFolder, 'src', 'css')
      ],
      outputStyle: 'compressed'
    })
      .on('error', plugins.sass.logError))
    .pipe(plugins.postcss([
      autoprefixer({
        browsers: ['last 2 versions', 'ie >= 10']
      }),
      cssnano()
    ]))
    .pipe(gulp.dest(publicFolder))
    .pipe(plugins.wait(1500))
    .pipe(plugins.connect.reload())
);

gulp.task('test-build-src', () => chi.buildCss({ dest: publicFolder }));

gulp.task('test-build-assets', () => chi.copyAssets({ dest: publicFolder }));

gulp.task('test-build', done => runSequence(
  'test-clean', [
    'test-build-src',
    'test-build-assets',
    'test-build-css',
    'test-build-html'
  ], done
));

gulp.task('test', done => {
  runSequence(
    'css-lint', 'backstop-test', done
  );
});
