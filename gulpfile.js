var gulp = require('gulp');

var webpack = require('gulp-webpack');
var webpackConfig = require('./webpack.config.js');
var rename = require('gulp-rename');
var mcss = require('gulp_mcss');

gulp.task('client-copy', function() {
    return gulp.src('./src/client/assets/**').pipe(gulp.dest('./public'));
});

webpackConfig.watch = true;
gulp.task('client-js', function() {
    return gulp.src('./src/client/js/index.js')
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('./public/js'));
});

gulp.task('client-css', function() {
    return gulp.src('./src/client/mcss/index.mcss')
        .pipe(mcss({
            pathes: ['./node_modules', './node_modules/regular-ui/src/mcss', './node_modules/regular-ui/node_modules'],
            importCSS: true
        }))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('watch', function() {
    gulp.watch('src/client/assets/**', ['client-copy']);
    gulp.watch(['src/client/mcss/**'], ['client-css']);
});

gulp.task('default', ['client-js', 'client-css', 'watch']);