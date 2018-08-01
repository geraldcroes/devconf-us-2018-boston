/*jslint node: true, stupid: true */
module.exports = function (gulp, plugins, current_config) {
    'use strict';
    var sassEntrypointPath = current_config.stylesSrcPath + '/custom-revealjs.scss';

    gulp.task('styles:slides', function () {

        return gulp.src(sassEntrypointPath)
            .pipe(plugins.exec(
                'sass ' + sassEntrypointPath,
                { pipeStdout: true }
            ))
            .pipe(plugins.exec.reporter({
                stdout: false
            }))
            .pipe(plugins.concatCss('build.css'))
            .pipe(plugins.autoprefixer())
            .pipe(plugins.csso())
            .pipe(gulp.dest(current_config.distDir))
            .pipe(plugins.connect.reload());
    });
};
