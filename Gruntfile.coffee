module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")

    browserify:
      app:
        files: "public/js/app.js": [ "coffee/**/*.coffee", "template/**/*.hbs" ]
        options:
          ignore: ["coffee/vendor.coffee"]
          extensions: [".coffee", ".hbs"]
          transform: ["coffeeify", "hbsfy"]
          aliasMappings: [
            {
              cwd: 'coffee',
              dest: 'myapp',
              src: ['**/*.coffee']
            }
            {
              cwd: 'template',
              dest: 'template',
              src: ['**/*.hbs']
            }
          ]
          external: ["jquery", "underscore", "backbone", "backbone.marionette"]
      vendor:
        files: "public/js/vendor.js": ["coffee/vendor.coffee"]
        options:
          transform: ["coffeeify"]
          alias: [
            "jquery:jquery"
            "underscore:underscore"
            "backbone:backbone"
            "backbone.marionette"
          ]
      test:
        files: "specs/spec.js": [ "specs/**/*.coffee" ]
        options:
          extensions: [".coffee", ".hbs"]
          transform: ["coffeeify", "hbsfy"]
          aliasMappings: [
            {
              cwd: 'coffee',
              dest: 'myapp',
              src: ['**/*.coffee']
            }
            {
              cwd: 'template',
              dest: 'template',
              src: ['**/*.hbs']
            }
          ]
          external: ["jquery", "underscore", "backbone", "backbone.marionette"]
    compass:
      options:
        bundleExec: true
        sassDir: "scss"
        imageDir: "img"
      app:
        options:
          httpPath: "/"
          httpStylesheetsPath: "/css"
          cssDir: "public/css"
          noLineComments: false
          outputStyle: "expanded"
    watch:
      options:
        livereload: true
      app:
        files: [
          "coffee/**/*.coffee"
          "template/**/*.hbs"
          "!coffee/vendor.coffee"
        ]
        tasks: ["browserify:app"]
      specs:
        files: [
          "specs/**/*.coffee"
        ]
        tasks: ["browserify:test"]
      scss:
        files: "scss/**/*.scss"
        tasks: ["compass"]

    testem:
      app:
        src: [
          "bower_components/expect/index.js"
          "bower_components/sinon/index.js"
          "public/js/vendor.js"
          "specs/spec.js"
        ]
        options:
          test_page: "specs/runner.mustache"
          launch_in_dev: ["Chrome"]
          launch_in_ci:  ["PhantomJS", "Firefox"]

    connect:
      server:
        options:
          livereload: true
          port: 9000
          base: "public"
          middleware: (connect, options) ->
            [
              connect.static(options.base)
              require("grunt-connect-proxy/lib/utils").proxyRequest
            ]
      proxies: [
        context: [
          "/users/"
          "/items/"
        ]
        host: "localhost"
        port: 3000
        changeOrigin: true
      ]

    easymock:
      api:
        options:
          port: 3000,
          path: 'easymock'
          config:
            routes: [
              "/users/:id"
            ]

  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks)
  grunt.registerTask "default", ["configureProxies", "connect:server", "easymock", "watch"]
