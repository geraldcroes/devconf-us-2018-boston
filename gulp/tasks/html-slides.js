/*jslint node: true, stupid: true */

module.exports = function (gulp, plugins, current_config) {
    'use strict';
    gulp.task('html:slides', function () {

        return gulp.src([current_config.slidesEntrypointPath])
            .pipe(plugins.exec(current_config.get_asciidoctor_revealjs_html_command(
                '<%= file.path %>',
                current_config.distDir + '/<%= file.stem %>.html'
            ), {
                pipeStdout: false
            }))
            .pipe(plugins.exec.reporter())
            .pipe(plugins.connect.reload());
    });
};

//// Custom functions to factorize asciidoctor generation commands
// beetween single and selfpaced generation (avoiding shifting configs over time)
// var asciidoctor_cli_common_arguments = ' -a docinfosPath=' + current_config.docinfosPath;
// current_config.get_asciidoctor_revealjs_html_command = function (source, destination, custom_attributes= '') {
//     return 'asciidoctor-revealjs'+ asciidoctor_cli_common_arguments +
//     ' ' + custom_attributes + ' -o "' + destination + '" "' + source +
//     '" && sed -i "s#plugin/highlight/highlight.js#plugin/highlight/highlight.min.js#g" "' + destination + '"';
// };