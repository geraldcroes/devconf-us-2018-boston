/*jslint node: true, stupid: true */
module.exports = function (gulp, plugins, current_config) {
    'use strict';
    gulp.task('connect', function () {
        return plugins.connect.server({
            root: current_config.distDir,
            host: current_config.listen_ip,
            port: current_config.listen_port,
            livereload: {
                hostname: current_config.listen_ip,
                port: current_config.livereload_port
            }
        });
    });
};
