/*!
grunt-dockerize 0.0.1, built on: 2017-02-03
Copyright (C) 2017 Daniel Arteaga
http://darteaga.com/
https://github.com/dani8art/grunt-dockerize

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.*/


'use strict';

var merge = require("set-options"),
  dockerService = require('./lib/docker-service');

var build = dockerService.build,
  login = dockerService.login,
  push = dockerService.push;

module.exports = function (grunt) {

  grunt.registerMultiTask('dockerize', 'Build and push a docker image using ./Dockerfile', function () {

    var done = this.async();

    //default options
    var defaultOptions = {
      registry: 'https://registry.hub.docker.com',
      auth: {
        email: 'DOCKER_HUB_EMAIL',
        username: 'DOCKER_HUB_USERNAME',
        password: 'DOCKER_HUB_PASSWORD'
      },
      push: false,
      name: this.target,
      tag: 'latest'
    };


    //user-given options
    var options = this.data.options;
    //merge options
    options = merge(options, defaultOptions);

    //transform auth
    for (var term in options.auth) {
      options.auth[term] = process.env[options.auth[term]];
    }

    //if push == true email is required. check if email is not empty or null.
    if (options.push && !options.auth.email) {
      grunt.fail.warn('email environment variable is empty or null');
      done(false);
    }

    //username is required. check if username is not empty or null.
    if (!options.auth.username) {
      grunt.fail.warn('username environment variable is empty or null');
      done(false);
    }

    //if push == true password is required. check if password is not empty or null.
    if (options.push && !options.auth.password) {
      grunt.fail.warn('password environment variable is empty or null');
      done(false);
    }

    //function to execute build command
    var imageName = options.auth.username + '/' + options.name + ':' + options.tag;

    build(imageName, grunt).then(function () {
      login(options.auth, grunt).then(function () {
        if (options.push) {
          push(imageName, grunt).then(done, done);
        }
      }, done);
    }, done);

  });

};