/*jslint node: true, stupid: true */

module.exports = function (gulp, plugins, current_config) {
    'use strict';
    gulp.task('dist:copy', function () {
        return gulp.src(current_config.distDir + '/**')
            .pipe(gulp.dest(current_config.distDir + '/'));
    });
};
