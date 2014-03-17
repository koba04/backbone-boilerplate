module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")

    browserify:
      app:
        files: "public/js/app.js": [ "coffee/**/*.coffee" ]
        options:
          ignore: ["coffee/specs/**/*.coffee"]
          extensions: [".coffee"]
          transform: ["coffeeify"]
          aliasMappings:
            cwd: 'coffee',
            dest: 'myapp',
            src: ['**/*.coffee']
      test:
        files: "specs/spec.js": [ "specs/**/*.coffee" ]
        options:
          extensions: [".coffee"]
          transform: ["coffeeify"]
          aliasMappings:
            cwd: 'coffee',
            dest: 'myapp',
            src: ['**/*.coffee']

    handlebars:
      options:
        processName: (filePath) -> filePath.replace /template\/(.*)?\.hbs$/, (path, name) -> return name
      app:
        files: "public/js/template.js": ["template/**/*.hbs"]

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

    concat:
      vendor:
        src: [
          "bower_components/jquery/dist/jquery.js"
          "bower_components/underscore/underscore.js"
          "bower_components/backbone/backbone.js"
          "bower_components/marionette/lib/backbone.marionette.js"
          "bower_components/handlebars/handlebars.runtime.js"
        ]
        dest: "public/js/vendor.js"

    watch:
      options:
        livereload: true
      coffee:
        files: [
          "coffee/**/*.coffee"
        ]
        tasks: ["browserify:app"]
      specs:
        files: [
          "specs/**/*.coffee"
        ]
        tasks: ["browserify:test"]
      handlebars:
        files: "template/**/*.hbs"
        tasks: ["handlebars"]
      scss:
        files: "scss/**/*.scss"
        tasks: ["compass"]

    testem:
      app:
        src: [
          "bower_components/expect/index.js"
          "bower_components/sinon/index.js"
          "public/js/vendor.js"
          "public/js/template.js"
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
