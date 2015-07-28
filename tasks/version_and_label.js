/*
 * grunt-version-and-label
 * https://github.com/krzysztofnowak/grunt-version-and-label
 *
 * Copyright (c) 2015 Krzysztof Nowak
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    grunt.registerMultiTask('version', 'Grunt task to increment build number', function () {
        // Merge default options with customized in Gruntfile.js
        var options = this.options({
            pkg: 'package.json'
        });

        if (!grunt.file.exists(options.pkg)) {
            grunt.log.warn('Source file "' + options.pkg + '" not found.');
            return false;
        }

        // Read file
        var src = grunt.file.read(options.pkg),
            // Convert to object, find build and increment number
            inputConfig = JSON.parse(src);

        // Increment build number
        inputConfig.build = inputConfig.build + 1;

        //Prepare readable content of file
        var modifiedInputConfig = JSON.stringify(inputConfig, null, '\t');

        // Write the destination file
        grunt.file.write(options.pkg, modifiedInputConfig);

        // Print a success message
        grunt.log.writeln('File "' + options.pkg + '" updated.');
    });

    grunt.registerMultiTask('label', 'Grunt task to print version on page', function () {

        //TODO move this to task body
        var prepareLabel = function (pattern) {
                var src = grunt.file.read(options.pkg);
                var inputConfig = JSON.parse(src);

                var result = pattern;
                result = result.replace('%version%', inputConfig.version);
                result = result.replace('%build%', inputConfig.build);
                result = result.replace('%date%', new Date());

                return result;
            },
            // TODO divide to preparation (to be placed out of loop)
            // TODO and to replace (leave inside loop)
            createLabel = function (path, pattern, labelContent) {
                if (!grunt.file.exists(path)) {
                    grunt.log.warn('Source file "' + path + '" not found.');
                    return false;
                }

                var file = grunt.file.read(path);

                var label = '<div class="dev-label">' + labelContent + '</div>';

                file = file.replace(pattern, label);

                grunt.file.write(path, file);
            };

        // Merge default options with customized in Gruntfile.js
        var options = this.options({
            pkg: 'package.json',
            dir: '',
            file: ['index.html'],
            label: 'version: %version% | build: %build% | generated: %date%',
            labelPattern: '<!-- version-label -->'
        });

        // Prepare label (merge pattern with real values)
        var label = prepareLabel(options.label);

        // Replace pattern tag with real content
        options.file.forEach(function (f) {
            createLabel(options.dir + f, options.labelPattern, label);
        });

        // Print a success message
        grunt.log.writeln('Generated label: ' + label);
    });


};
