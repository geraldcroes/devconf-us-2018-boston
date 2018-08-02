/*jslint node: true, stupid: true */

module.exports = function (gulp, plugins, current_config) {
    'use strict';
    gulp.task('html', function (done) {

        var attributes = {
            'revealjsdir': 'node_modules/reveal.js@',
            'docinfosPath': current_config.docinfosPath,
        },
            options = {
                safe: 'unsafe',
                backend: 'revealjs',
                attributes: attributes,
                to_dir: '/app/dist',
            };

        plugins.asciidoctor.convertFile(
            current_config.sourcesDir + '/index.adoc',
            options
        );

        plugins.connect.reload();

        done();
    });
};
