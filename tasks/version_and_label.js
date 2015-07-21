/*
 * grunt-version-and-label
 * https://github.com/krzysztofnowak/grunt-version-and-label
 *
 * Copyright (c) 2015 Krzysztof Nowak
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

	// Please see the Grunt documentation for more information regarding task
	// creation: http://gruntjs.com/creating-tasks

	var buildNumber;
	var labelPattern = '<!-- version-label -->';


	grunt.registerMultiTask('version', 'Grunt task to manage versioning and displaying on page', function () {
		// Merge task-specific and/or target-specific options with these defaults.
		var options = this.options({
			dir: '',
			pkg: 'package.json'
		});

		var filepathIn = options.dir + options.pkg;
		var filepathOut = options.dir + options.pkg;
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
		grunt.log.warn('file: >>' + buildNumber + '<<');

		buildNumber += 1;

		inputConfig.build = buildNumber;

		var modifiedInputConfig = JSON.stringify(inputConfig, null, '\t');

		grunt.log.writeln('test: ' + buildNumber);

		// Write the destination file.
		grunt.file.write(filepathOut, modifiedInputConfig);

		// Print a success message.
		grunt.log.writeln('File "' + filepathOut + '" updated.');
		//});
	});

	var prepareLabel = function(pattern) {
		var result = pattern.replace('%build%', buildNumber);
		return result;
	};

	var createLabel = function(path, labelContent) {
		grunt.log.warn('LABEL: >>' + path + '<<');

		if (!grunt.file.exists(path)) {
			grunt.log.warn('Source file "' + path + '" not found.');
			return false;
		}

		var file = grunt.file.read(path);

		var label = '<div class="dev-label">'+labelContent+'</div>';

		file = file.replace(labelPattern, label);

		grunt.file.write(path, file);
	};

	grunt.registerMultiTask('label', 'Grunt task to print version on page', function () {

		var options = this.options({
			dir: '',
			file: ['index.html'],
			label: 'version: %version% | build: %build%'
		});

		var label = prepareLabel(options.label);

		options.file.forEach(function (f) {
			createLabel(options.dir+f, label);
		});

		grunt.log.warn('LABEL: >>' + buildNumber + '<<');
	});


};
