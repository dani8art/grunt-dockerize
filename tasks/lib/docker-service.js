/*!
grunt-dockerize 0.0.2, built on: 2017-02-18
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

var composeManager = require('docker-composer-manager'),
    Promise = require('bluebird');


module.exports = {
    build: _build,
    login: _login,
    push: _push
};

function _build(imageName, grunt) {
    return new Promise(function (resolve, reject) {
        grunt.log.writeln('Building ' + imageName);
        composeManager.execCommand('docker build -t ' + imageName + ' . ', function (stdout, stderr) {
            grunt.log.writeln(stdout + stderr);
            resolve();
        }, function (error, stderr) {
            grunt.fail.warn('Error in executeCommand ' + stderr);
            reject(error);
        });

    });
}

function _login(auth, grunt) {
    return new Promise(function (resolve, reject) {
        grunt.log.writeln('Login as: ' + auth.username);
        composeManager.execCommand('docker login -u="' + auth.username + '" -p="' + auth.password + '"',
            function (stdout, stderr) {
                grunt.log.writeln(stdout + stderr);
                resolve();
            },
            function (error, stderr) {
                grunt.fail.warn('Error in executeCommand ' + stderr);
                reject(error);
            });

    });
}

function _push(imageName, grunt) {
    return new Promise(function (resolve, reject) {
        grunt.log.writeln('Pushing to dockerhub: ' + imageName);
        composeManager.execCommand('docker push ' + imageName + '', function (stdout, stderr) {
                grunt.log.writeln(stdout + stderr);
                resolve();
            },
            function (error, stderr) {
                grunt.fail.warn('Error in executeCommand ' + stderr);
                reject(error);
            });

    });
}