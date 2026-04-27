import gulp from 'gulp';
import * as sass from 'sass';
import gulpSass from 'gulp-sass';
import gulpUglifyEs from 'gulp-uglify-es';
import gulpConcat from 'gulp-concat';
import browserSync from 'browser-sync';
import { deleteAsync } from 'del';
import prefix from 'gulp-autoprefixer';
import images from 'gulp-imagemin';
import gulpTtf2woff from 'gulp-ttf2woff';
import gulpTtf2woff2 from 'gulp-ttf2woff2';
import plum from 'gulp-plumber';
import not from 'gulp-notify';
const { src, dest, watch, parallel, series } = gulp;
const scss = gulpSass(sass);
const uglify = gulpUglifyEs.default;
const concat = gulpConcat;
const autoPrefixer = prefix;
const gulpImage = images;
const plumber = plum;
const notify = not;

function styles() {
    return src(['app/scss/**/*.scss'])
        .pipe(autoPrefixer({ overrideBrowserslist: ['last 10 version'], grid: 'autoplace' }))
        .pipe(scss({ style: 'compressed' }))
        .pipe(concat('style.min.css'))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
}
function scripts() {
    return src([
        'app/js/**/*.js',
        '!app/js/main.min.js',
    ])
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: 'JS Error',
                message: error.message
            }))
        }))
        .pipe(uglify())
        .pipe(concat('main.min.js'))
        .pipe(dest('app/js'))
        .pipe(browserSync.stream())
}
function watching() {
    watch(['app/js/main.js'], scripts)
    watch(['app/scss/style.scss'], styles)
    watch(['app/index.html']).on('change', browserSync.reload)
}
function brUpdater() {
    browserSync.init({
        server: {
            baseDir: "app"
        }
    });
}
function building() {
    return src(
        ['app/css/style.min.css',
            'app/fonts/**/*.woff',
            'app/fonts/**/*.woff2',
            'app/js/main.min.js',
            'app/**/*.html'],
        { base: 'app' })
        .pipe(dest('dist'))
}

async function cleanDist() {
    await deleteAsync(['dist/**'])
}

function img() {
    return src('app/images/*',
        { encoding: false })
        .pipe(gulpImage())
        .pipe(dest('dist/images'))
}

function ttf2woff() {
    return src(['app/fonts/*.ttf'], { encoding: false })
        .pipe(gulpTtf2woff())
        .pipe(dest('app/fonts'))
}
function ttf2woff2() {
    return src(['app/fonts/*.ttf'], { encoding: false })
        .pipe(gulpTtf2woff2())
        .pipe(dest('app/fonts'))
}
const build = series(cleanDist, img, building);
const dev = parallel(styles, scripts, brUpdater, watching);
const font = parallel(ttf2woff, ttf2woff2)
export { styles, scripts, watching, brUpdater, building, build, img, ttf2woff, ttf2woff2, font, cleanDist };
export default dev;