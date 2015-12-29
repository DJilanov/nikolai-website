/*
 * fileReplace
 * https://github.com/danielhusar/grunt-file-replace
 *
 * Copyright (c) 2014 Daniel Husar
 * Licensed under the MIT license.
 */

'use strict';

var request = require('request');
var fs = require('fs');

module.exports = function (grunt) {

  grunt.registerMultiTask('fileReplace', 'Replaces the files from local or network source.', function () {

    var files = this.data;
    var total = Object.keys(files).length;
    var done = this.async();

    /**
     * Copy remote file to local hardrive
     * @param  {string}   source source of the file to copy
     * @param  {string}   target destination of the file to be placed
     * @param  {Function} cb   callback when file is copied
     * @return {void}
     */
    var copyLocalFile = function(source, target, cb) {
      var cbCalled = false;

      var rd = fs.createReadStream(source);
      rd.on("error", function(err) {
        done(err);
      });
      var wr = fs.createWriteStream(target);
      wr.on("error", function(err) {
        done(err);
      });
      wr.on("close", function(ex) {
        done();
      });
      rd.pipe(wr);

      function done(err) {
        if (!cbCalled) {
          cb(err);
          cbCalled = true;
        }
      }
    };

    /**
     * Copy remote file to local hardrive
     * @param  {string}   url  url of the remote file
     * @param  {string}   dest destination where to copy file
     * @param  {Function} cb   callback when file is copied
     * @return {void}
     */
    var copyRemoteFile = function(url, dest, cb) {
      var get = request(url);
      get.on('response',  function (res) {
        res.pipe(fs.createWriteStream(dest));
        res.on('end', function () {
          cb();
        });
        res.on('error', function (err) {
          cb(err);
        });
      });
    };

    /**
     * Loop through all files
     */
    Object.keys(files).forEach(function(key) {
      var callback = function(err){
        if(!err){
          grunt.log.ok([key + ' was replaced by: ' + files[key]]);
        } else {
          grunt.log.error([files[key] + ' probably doesnt exists.']);
        }
        if(--total === 0){
          done();
        }
      };
      if(files[key].match(/\b(?:https?):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim)){
        copyRemoteFile(files[key], key, callback);
      } else {
        copyLocalFile(files[key], key, callback);
      }
    });

  });

};
