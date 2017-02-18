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

module.exports = function (grunt) {
  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-release-github');
  grunt.loadNpmTasks('grunt-banner');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    license: grunt.file.read('extra/license-notice', {
      encoding: 'utf8'
    }).toString(),
    releaseNote: grunt.file.read('extra/release-notes', {
      encoding: 'utf8'
    }).toString(),
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/**/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    usebanner: {
      license: {
        options: {
          position: 'top',
          banner: '/*!\n<%= license %>*/\n',
          replace: true
        },
        files: {
          src: ['tasks/**/*.js', 'test/**/*.js', 'Gruntfile.js']
        }
      },
      readme: {
        options: {
          position: 'bottom',
          banner: '### Latest release\n\n<%= releaseNote %>',
          replace: /###\sLatest\srelease(\s||.)+/g,
          linebreak: false
        },
        files: {
          src: ['README.md']
        }
      }
    },
    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    dockerize: {
      'testing-grunt-dockerize01': {
        options: {
          auth: {
            email: "DOCKER_HUB_EMAIL",
            username: "DOCKER_HUB_USERNAME",
            password: "DOCKER_HUB_PASSWORD"
          },
          name: 'grunt-dockerize',
          push: true
        }
      },
      'testing-grunt-dockerize02': {
        options: {
          auth: {
            email: "DOCKER_HUB_EMAIL",
            username: "DOCKER_HUB_USERNAME",
            password: "DOCKER_HUB_PASSWORD"
          },
          name: 'grunt-dockerize',
          tag: '<%= pkg.version %>',
          push: true
        }
      }
    },

    //Create a new release.
    release: {
      options: {
        changelog: true, //default: false
        changelogFromGithub: true,
        githubReleaseBody: 'See [CHANGELOG.md](./CHANGELOG.md) for details.',
        //changelogText: '\nhello\n <%= grunt.config.get("pkg.changelog") %>',
        npm: true, //default: true
        //npmtag: true, //default: no tag
        beforeBump: ['usebanner'], // optional grunt tasks to run before file versions are bumped
        afterBump: [], // optional grunt tasks to run after file versions are bumped
        beforeRelease: [], // optional grunt tasks to run after release version is bumped up but before release is packaged
        afterRelease: [], // optional grunt tasks to run after release is packaged
        updateVars: ['pkg'], // optional grunt config objects to update (this will update/set the version property on the object specified)
        github: {
          repo: "dani8art/grunt-dockerize",
          accessTokenVar: "GITHUB_ACCESS_TOKEN",
          usernameVar: "GITHUB_USERNAME"
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*-test.js']
    }

  });

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'nodeunit']);

  grunt.registerTask('build', ['dockerize']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};