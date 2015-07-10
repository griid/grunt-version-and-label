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
	    dir: '',
      pkg: 'package.json'
    });

	  var filepathIn = options.dir+options.pkg;
	  var filepathOut = options.dir+options.pkg;
    // Iterate over all specified file groups.
    //options.pkg.forEach(function(f) {
    //  // Handle reading file
    //  var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepathIn)) {
          grunt.log.warn('Source file "' + filepathIn + '" not found.');
          return false;
        }
      //}).map(function(filepath) {
      //  // Read file source.
      //  return grunt.file.read(filepath);
      //});
    //
	  var src = grunt.file.read(filepathIn);
	   // // Convert to object, find build and increment number
	   var inputConfig = JSON.parse(src);
	   buildNumber = inputConfig.build;
    grunt.log.warn('file: >>' + buildNumber+'<<');

	   buildNumber += 1;

	   inputConfig.build = buildNumber;

	   var modifiedInputConfig = JSON.stringify(inputConfig, null, '\t');

	   grunt.log.writeln('test: '+ buildNumber);

      // Write the destination file.
      grunt.file.write(filepathOut, modifiedInputConfig);

      // Print a success message.
      grunt.log.writeln('File "' + filepathOut + '" updated.');
    //});
  });

};
