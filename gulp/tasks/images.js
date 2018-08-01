/*jslint node: true, stupid: true */
module.exports = function (gulp, plugins, current_config) {
    'use strict';
    gulp.task('images', function () {

        // We merge the "training-commons" and training's specific images on a temp dir
        var specificImages = gulp.src(current_config.imgSrcPath + '/*')
            .pipe(gulp.dest(current_config.preparedSrcPath + '/images/')),
            commonImages = gulp.src(current_config.commonsPath + '/images/*')
            .pipe(gulp.dest(current_config.preparedSrcPath + '/images/'));

        return plugins.mergeStreams(specificImages, commonImages)
            .pipe(plugins.connect.reload());
    });

    gulp.task('images:styles', function () {
        // We also take care of copying the styles images to the "build" folder containgin Web resources
        return gulp.src(current_config.stylesSrcPath + '/images/*')
            .pipe(gulp.dest(current_config.webResourcesDirName));
    });
};
