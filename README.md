# grunt-dockerize

> Task plugin for grunt that builds and pushs docker images.

## Getting Started
This plugin requires Grunt `^1.0.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-dockerize --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-dockerize');
```

## The "grunt-dockerize" task

### Overview
In your project's Gruntfile, add a section named `dockerize` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  dockerize: {
      image01: {
        options: {
          auth: {
            email: "DOCKER_HUB_EMAIL",
            username: "DOCKER_HUB_USERNAME",
            password: "DOCKER_HUB_PASSWORD"
          },
          name: 'image01',
          push: true
        }
      },
});
```

### Options

``` 
{
    registry: 'https://registry.hub.docker.com',
    auth: {
      email: 'DOCKER_HUB_EMAIL',
      username: 'DOCKER_HUB_USERNAME',
      password: 'DOCKER_HUB_PASSWORD'
    },
    name: this.target,
    push: false,
    tag: 'latest'
}
```

#### options.auth
Type: `Object`

Default value: 
```js
auth: {
    email: "DOCKER_HUB_EMAIL",
    username: "DOCKER_HUB_USERNAME",
    password: "DOCKER_HUB_PASSWORD"
  }
```
A object that contains docker hub credentials for login. `auth.username` is used for the owner of image in image name: `auth.username/options.name` = `darteaga/image01`

#### options.name
Type: `String`

Default value: `this.target` in this example `image01`

A string value that is used for the image name.

#### options.push
Type: `Boolean`

Default value: `false`

A boolean value that is used to decide if the built image is pushed.

#### options.tag
Type: `String`

Default value: `latest`

A string value that is used for the image tag.

### Usage Examples

#### Custom Options
In this example, custom options are used to do build an push a docker image

> Remember that you must have a 'Dockerfile' in current directory.

```js
grunt.initConfig({
  dockerize: {
    image01: {
      options: {
        auth: {
          email: "DOCKER_HUB_EMAIL",
          username: "DOCKER_HUB_USERNAME",
          password: "DOCKER_HUB_PASSWORD"
        },
        name: 'image01',
        push: true
      }
    },
});
```

Run:
```js
grunt dockerize
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

### Latest release

The version 0.0.1 is the latest stable version of grunt-dockerize component.
see [release note](https://github.com/dani8art/grunt-dockerize/releases/tag/0.0.1) for details.

For running:

- Download latest version from [0.0.1](https://github.com/dani8art/grunt-dockerize/releases/tag/0.0.1)