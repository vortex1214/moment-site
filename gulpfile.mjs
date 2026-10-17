import gulp from "gulp";
import autoprefixer from "gulp-autoprefixer";
import gulpSass from 'gulp-sass';
import * as importedSass from 'sass';
import browserSync from 'browser-sync';
import gulpSourcemaps from 'gulp-sourcemaps';
import webp from 'gulp-webp';

const sass = gulpSass( importedSass );

const { task, src, dest } = gulp;


task('webp', async function() {
    return src('app/img/to-webp/**/*.{png,jpg,jpeg,PNG,JPG,JPEG}', { base: 'app/img/to-webp', encoding: false })
        .pipe(webp({ quality: 80 }))
        .pipe(dest('app/img'));
});

task('scss', function() {
    return src('app/scss/main.scss')
        .pipe(gulpSourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed',
            silenceDeprecations: ['legacy-js-api', 'import']
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 5 versions']
        }))
        .pipe(gulpSourcemaps.write('.'))
        .pipe(dest('app/css'))
        .pipe(browserSync.reload({ stream: true }));
});

task('scripts', function() {
    return src(['app/js/index.js'])
        .pipe(browserSync.reload({ stream: true }))
});

task('code', function() {
    return src('app/*.html')
        .pipe(browserSync.reload({ stream: true }))
});

task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});

task('watch', function() {
    gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
    gulp.watch('app/*.html', gulp.parallel('code'));
    gulp.watch(['app/js/index.js', 'app/libs/**/*.js'], gulp.parallel('scripts'));
    gulp.watch('app/img/to-webp/**/*.{png,jpg,jpeg,PNG,JPG,JPEG}', gulp.parallel('webp'));
});

task('default', gulp.parallel('scss', 'webp', 'scripts', 'browser-sync', 'watch'));
