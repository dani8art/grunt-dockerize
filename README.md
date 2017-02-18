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

```js 
{
    registry: 'https://registry.hub.docker.com', //NOT SUPPORTED YET
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
`options.auth` contains the name of evironment variables that will be used for logging
in docker hub. Also, `auth.username` will be used for build the name of docker image,
 `auth.username/options.name` = `darteaga/image01`

 Name | Type | Description
 -----|------|------------
 email| `String`| **Required**. The name of evironment variable that contains the value of email. By default, its value is DOCKER_HUB_EMAIL and `grunt-dockerize` will expect a value on process.env["DOCKER_HUB_EMAIL"].
 username | `String` | **Required**. The name of evironment variable that contains the value of username. By default, its value is DOCKER_HUB_USERNAME and `grunt-dockerize` will expect a value on process.env["DOCKER_HUB_USERNAME"].
 password | `String` | **Required**. The name of evironment variable that contains the value of password. By default, its value is DOCKER_HUB_PASSWORD and `grunt-dockerize` will expect a value on process.env["DOCKER_HUB_PASSWORD"].

**Example**: 

```js
auth: {
    email: "DOCKER_HUB_EMAIL",
    username: "DOCKER_HUB_USERNAME",
    password: "DOCKER_HUB_PASSWORD"
  }
```

#### options.name

Name | Type | Description
-----|------|-------------
name | `String`| **Required**.  A string value that will be used such as the image name. By default, It is used `this.target`.



#### options.push

Name | Type | Description
-----|------|-------------
push | `Boolean`| **Required**. A boolean value that is used to decide if the built image is pushed. By befault, it is `false`.


#### options.tag

Name | Type | Description
-----|------|-------------
tag | `String`| **Required**. A string value that is used for the image tag. By befault, it is `latest`.

### Usage Examples

#### Custom Options
In this example, custom options are used to build an push a docker image

> **WARNING**. Remember that you must have a 'Dockerfile' in current directory.

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

The version 0.0.2 is the latest stable version of grunt-dockerize component.
see [release note](https://github.com/dani8art/grunt-dockerize/releases/tag/0.0.2) for details.

For running:

- Download latest version from [0.0.2](https://github.com/dani8art/grunt-dockerize/releases/tag/0.0.2)