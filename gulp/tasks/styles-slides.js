/*jslint node: true, stupid: true */
module.exports = function (gulp, plugins, current_config) {
    'use strict';
    var sassEntrypointPath = current_config.stylesSrcPath + '/slides/cloudbees-revealjs.scss';

    gulp.task('styles:slides', function () {

        var buildCssFromSass = gulp.src(sassEntrypointPath)
            .pipe(plugins.exec(
                'sass ' + sassEntrypointPath,
                { pipeStdout: true }
            ))
            .pipe(plugins.exec.reporter({
                stdout: false
            })),
            fetchFontCssStyles = gulp.src(current_config.stylesSrcPath + '/fonts-styles/**/*.css');

        return plugins.mergeStreams(buildCssFromSass, fetchFontCssStyles)
            .pipe(plugins.concatCss('build.css'))
            .pipe(plugins.autoprefixer())
            .pipe(plugins.csso())
            .pipe(gulp.dest(current_config.webResourcesDirName))
            .pipe(plugins.connect.reload());
    });
};
