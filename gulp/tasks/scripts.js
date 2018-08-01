/*jslint node: true, stupid: true */
module.exports = function (gulp, plugins, current_config) {
    'use strict';
    gulp.task('scripts', function () {
        return gulp.src(current_config.scriptsSrcPath + '/*')
            .pipe(gulp.dest(current_config.distDir + '/scripts/'));
    });
};
