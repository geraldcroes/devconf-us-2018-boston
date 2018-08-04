/*jslint node: true, stupid: true */

var tasks_dir_path = './tasks',
    fs = require('fs'),
    path = require('path'),
    gulp = require('gulp'),
    file = '',
    plugins = {
        autoprefixer: require('gulp-autoprefixer'),
        compass: require('gulp-compass'),
        concatCss: require('gulp-concat-css'),
        connect: require('gulp-connect'),
        csso: require('gulp-csso'),
        exec: require('gulp-exec'),
        rename: require('gulp-rename'),
        mergeStreams: require('merge-stream'),
        fs: require('fs'),
        path: require('path'),
        sass: require('gulp-sass'),
        asciidoctor: require('asciidoctor.js')(),
        asciidoctorRevealjs: require('asciidoctor-reveal.js')
    },
    current_config = {
        docinfosPath: '/app/slides/docinfos',
        imgSrcPath: '/app/slides/images',
        stylesSrcPath: '/app/assets/styles',
        fontSrcPath: '/app/assets/fonts',
        scriptsSrcPath: '/app/assets/scripts',
        faviconPath: '/app/slides/images/favicon.ico',
        distDir: '/app/dist',
        sourcesDir: '/app/slides',
        nodeModulesDir: '/app/node_modules',
        listen_ip: process.env.LISTEN_IP || '0.0.0.0',
        listen_port: process.env.LISTEN_PORT || 8000,
        livereload_port: process.env.LIVERELOAD_PORT || 35729,
    };

fs.readdirSync(tasks_dir_path).forEach(function (file) {
    'use strict';
    require(path.join(process.cwd(), tasks_dir_path, file))(gulp, plugins, current_config);
});


gulp.task('build', gulp.series(
    gulp.parallel(
        'fonts',
        'images',
        'favicon',
        'prepare:js-revealjs',
        'prepare:js-highlightjs',
        'styles'
    ),
    'html'
));

gulp.task('pdf', gulp.series('build', 'pdf-generate'));

gulp.task('serve', gulp.parallel('connect', 'watch'));

gulp.task('default', gulp.series('clean', 'build', 'serve'));
