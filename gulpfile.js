'use strict'
var
    gulp = require('gulp'),
    browserSync = require('browser-sync'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    config = require('./config.json');


var
    browser = config.browser,
    dev = config.folder.development || '.',
    prod = config.folder.production || '.',
    partials = config.folder.partials;



gulp.task('sass', () => {
    return gulp.src(`${dev}/sass/**/*.{scss,sass}`)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(`${prod}/css`));
})
gulp.task('browserSync', () => {
    browserSync.init({
        server: { baseDir: prod},
        browser: browser // Indica que navegador se utilizará
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
    gulp.watch(`${dev}/sass/**/*.{scss,sass}`, ['sass', browserSync.reload]);
    gulp.watch(`${dev}/pug/**/*.pug`, ['pug', browserSync.reload]);

});
