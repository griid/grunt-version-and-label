/*
 * grunt-version-and-label
 * https://github.com/krzysztofnowak/grunt-version-and-label
 *
 * Copyright (c) 2015 Krzysztof Nowak
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/*.js',
				'<%= nodeunit.tests %>'
			],
			options: {
				jshintrc: '.jshintrc'
			}
		},

		// Before generating any new files, remove any previously-created files.
		clean: {
			tests: ['tmp']
		},

		copy: {
			tests: {
				expand: true,
				flatten: true,
				src: 'test/pattern/**',
				dest: 'test/tmp/',
				filter: 'isFile'
			}
		},

		// Configuration to be run (and then tested).
		version_and_label: {
			default_options: {},
			custom_options: {
				options: {
					dir: 'test/tmp/'
				},
				files: {
					'tmp/custom_options': ['test/fixtures/index.htm', 'test/fixtures/package.json']
				}
			}
		},

		// Unit tests.
		nodeunit: {
			tests: ['test/*_test.js']
		}

	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');

	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.
	//grunt.registerTask('test', ['clean', 'copy', 'version_and_label', 'nodeunit']);
	grunt.registerTask('test', ['copy', 'version_and_label']);

	// By default, lint and run all tests.
	grunt.registerTask('default', ['jshint', 'test']);

};
