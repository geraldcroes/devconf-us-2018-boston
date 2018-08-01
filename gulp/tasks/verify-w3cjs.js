/*jslint node: true, stupid: true */
module.exports = function (gulp, plugins, current_config) {
    'use strict';
    gulp.task('verify:w3c', function () {
        return gulp.src(current_config.distDir + '/*.html')
            .pipe(plugins.w3cjs())
            .pipe(plugins.w3cjs.reporter());
    });
};
