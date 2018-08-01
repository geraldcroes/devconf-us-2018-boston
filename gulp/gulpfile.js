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
        header: require('gulp-header'),
        gulpIgnore: require('gulp-ignore'),
        rename: require('gulp-rename'),
        template: require('gulp-template'),
        mergeStreams: require('merge-stream'),
        fs: require('fs'),
        path: require('path'),
        w3cjs: require('gulp-w3cjs')
    },
    current_config = {
        docinfosPath: '/app/slides/docinfos',
        imgSrcPath: '/app/training/images',
        stylesSrcPath: '/app/docs-toolkit/styles',
        fontSrcPath: '/app/docs-toolkit/fonts',
        scriptsSrcPath: '/app/docs-toolkit/scripts',
        faviconPath: '/app/docs-commons/images/favicon.ico',
        preparedSrcPath: '/tmp/prepare-src',
        distDir: '/app/dist',
        asciidocStyleFactoryPath: '/asciidoctor-stylesheet-factory-master',
        sourcesDir: '/app/training',
        nodeModulesDir: '/app/docs-toolkit/node_modules',
        listen_ip: process.env.LISTEN_IP || '0.0.0.0',
        listen_port: process.env.LISTEN_PORT || 8000,
        livereload_port: process.env.LIVERELOAD_PORT || 35729,
    };

fs.readdirSync(tasks_dir_path).forEach(function (file) {
    'use strict';
    require(path.join(process.cwd(), tasks_dir_path, file))(gulp, plugins, current_config);
});


gulp.task('build:html', gulp.series(
    gulp.parallel(
        'fonts',
        'images',
        'favicon',
        'prepare:js-revealjs',
        'prepare:js-highlightjs',
        'images:styles',
        'styles:slides'
    ),
    'html:slides'
));


gulp.task('dist', gulp.series('build:html', 'dist:copy'));

gulp.task('pdf:slides', gulp.series('build:html', 'pdf:slides-generate'));

gulp.task('build:pdf', gulp.parallel('pdf:slides'));

gulp.task('verify', gulp.parallel('verify:w3c', 'verify:links'));

gulp.task('serve', gulp.parallel('connect', 'watch'));

gulp.task('default', gulp.series('clean', 'build:html', 'serve'));
