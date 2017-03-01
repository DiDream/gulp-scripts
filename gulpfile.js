'use strict'
var
    gulp = require('gulp'),
    browserSync = require('browser-sync'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    config = require('./config.json'),
    argv = require('yargs').argv,
    path = argv.path || '.';
    path += '/';

var
    browser = config.browser,
    dev = path + config.folder.development || '.',

    prod = path + config.folder.production || '.',
    partials = config.folder.partials;





gulp.task('sass', () => {
    return gulp.src(`${dev}/sass/**/*.{scss,sass}`)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(`${prod}/css`));
})
gulp.task('browserSync', () => {
    browserSync.init({
        server: { baseDir: prod},
        browser: browser
    })
});
gulp.task('pug', ()=> {
    return gulp.src([`${dev}/pug/**/*.pug`,`!${dev}/pug/_${partials}/**/*.pug` ])
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest(prod));
})

gulp.task('simple-web',['browserSync'], () => {
    console.log("Iniciando...");
    argv.nosass?
        gulp.watch(`${prod}/**/*.css`, browserSync.reload):
        gulp.watch(`${dev}/sass/**/*.{scss,sass}`, ['sass', browserSync.reload]);

    argv.nopug?
        gulp.watch(`${prod}/**/*.html`, browserSync.reload):
        gulp.watch(`${dev}/pug/**/*.pug`, ['pug', browserSync.reload]);


});
