/*
 * grunt-version-and-label
 * https://github.com/krzysztofnowak/grunt-version-and-label
 *
 * Copyright (c) 2015 Krzysztof Nowak
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

	var buildNumber;

  grunt.registerMultiTask('version_and_label', 'Grunt task to manage versioning and displaying on page', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      punctuation: '.',
      separator: ', '
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      }).join(grunt.util.normalizelf(options.separator));

	    var inputConfig = JSON.parse(src);
	    buildNumber = inputConfig.build;

	    buildNumber += 1;

	    inputConfig.build = buildNumber;

	    var modifiedInputConfig = JSON.stringify(inputConfig, null, '\t');

	    grunt.log.writeln('test: '+ buildNumber);

      // Write the destination file.
      grunt.file.write(f.dest, modifiedInputConfig);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
