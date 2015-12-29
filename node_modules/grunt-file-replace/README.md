# grunt-file-replace [![Build Status](https://travis-ci.org/danielhusar/grunt-file-replace.svg)](https://travis-ci.org/danielhusar/grunt-file-replace) [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

> Replaces the files on your harddrive from local or network source.

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-file-replace --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-file-replace');
```

## The "grunt-file-replace" task

### Overview
In your project's Gruntfile, add a section named `fileReplace` to the data object passed into `grunt.initConfig()`.
Remote files must beggin with http or https

Key of the object is local file, value is remote file to grap and put on the place where key is located.

```js
grunt.initConfig({
  fileReplace: {
    patterns: {
      'test/expected/local': 'test/fixtures/123',
      'test/expected/remote': 'https://raw.github.com/danielhusar/grunt-file-replace/master/test/fixtures/123'
    }
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2014 Daniel Husar. Licensed under the MIT license.
