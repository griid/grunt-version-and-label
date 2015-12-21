# grunt-version-and-label

> Grunt tasks to manage versioning and displaying on page.
> Package consists two tasks:
>
> version - bumps build number
>
> label - generates and prints label into html file

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command: 

```shell
npm install grunt-version-and-label --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-version-and-label');
```

## Overview
This package consists two tasks which bumps your build number and creates label
 that will be printed on your page.

Let's say you're working on project that is still under development but needs
QA team to check it. Label with build number visible on page will help you to
track spotted issue.

In your project's Gruntfile, add sections named `version` and `label` to the
data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  version: {
		default_options: {
		},
		custom_options: {
			options: {
				pkg: 'build.json'
			}
		}
	},
	label: {
		custom_options: {
			options: {
				dir: 'html/'
			}
		}
	},
});
```

## The "version" task

```js
grunt.initConfig({
  label: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  }
});
```

### Options

#### options.pkg
Type: `String`
Default value: `'package.json'`

A filename, where version and build number is stored.

## The "label" task

```js
grunt.initConfig({
  label: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  }
});
```

### Options

#### options.pkg
Type: `String`
Default value: `'package.json'`

A filename, where version and build number is stored.

#### options.dir
Type: `String`
Default value: `''`

A path to folder with files to modify. It will be build/out/dist folder.

#### options.file
Type: `Array`
Default value: `'['index.html']'`

An array with filenames existing in options.dir folder thats needs a label with version and build.

#### options.label
Type: `String`
Default value: `'version: %version% | build: %build% | generated: %date%'`

A pattern used to build a label content.

#### options.labelPattern
Type: `String`
Default value: `'<!-- version-label -->'`

A pattern in html page that will be used to place label into your code.


### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  version: {
  			default_options: {},
  			custom_options: {
  				options: {
  					pkg: 'test/tmp/build.json'
  				}
  			}
  		},

  		label: {
  			custom_options: {
  				options: {
  					dir: 'test/tmp/'
  				}
  			}
  		},
});
```

#### Custom Options
In this example, custom options are used to do something else with whatever else. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result in this case would be `Testing: 1 2 3 !!!`

```js
grunt.initConfig({
  version_and_label: {
    options: {
      separator: ': ',
      punctuation: ' !!!',
    },
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
