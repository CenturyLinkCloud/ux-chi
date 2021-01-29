import gulp from 'gulp';
import sass from 'gulp-sass';
import sri from 'gulp-sri';
 
gulp.task('srichicss', function() {
    var srcGlob = 'dist/chi.css';
    return gulp.src(srcGlob)
        .pipe(sri())
        .pipe(gulp.dest('.'));
});