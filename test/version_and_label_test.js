'use strict';

var grunt = require('grunt');

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

exports.version_and_label = {
	setUp: function (done) {
		// setup here if necessary
		done();
	},
	default_options: function (test) {
		test.expect(1);

		var actual = JSON.parse(grunt.file.read('package.json')).build;
		var previous = JSON.parse(grunt.file.read('tmp/package.json')).build;
		test.equal(actual, previous+1, 'Build number is incremented by one');

		test.done();
	},
	custom_options: function (test) {
		test.expect(1);

		var actual = grunt.file.read('test/tmp/build.json');
		var expected = grunt.file.read('test/expected/build.json');
		test.equal(actual, expected, 'Custom parameters allows choosing files');

		test.done();
	}
};
