module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")

    coffee:
      compile:
        files:
          "public/js/app.js": [
            "coffee/app.coffee"
            "coffee/utils/**/*.coffee"
            "coffee/models/*.coffee"
            "coffee/collections/*.coffee"
            "coffee/views/*.coffee"
            "coffee/views/**/*.coffee"
            "coffee/router.coffee"
          ]

    handlebars:
      compile:
        options:
          namespace: "<%= pkg.name %>.JST"
          processName: (filePath) ->
            filePath.replace /template\/(.*)?\.hbs$/, (path, name) -> return name
        files: "public/js/template.js": ["template/**/*.hbs"]

    concat:
      vendorJS:
        src: [
          "bower_components/zepto/zepto.min.js"
          "bower_components/lodash/dist/lodash.min.js"
          "bower_components/backbone/backbone-min.js"
          "bower_components/handlebars/handlebars.js"
          "bower_components/jsdeferred/jsdeferred.js"
        ]
        dest: "public/js/vendor.js"

    watch:
      options:
        livereload: true
      html:
        files: "public/index.html"
        tasks: []
      coffee:
        files: "coffee/**/*.coffee"
        tasks: ["coffee"]
      handlebars:
        files: "template/**/*.hbs"
        tasks: ["handlebars"]

    testem:
      app:
        src: [
          "bower_components/expect/expect.js"
          "bower_components/sinon/lib/sinon.js"
          "public/js/vendor.js"
          "public/js/template.js"
          "public/js/app.js"
          "spec/**/*_spec.coffee"
        ]
        options:
          test_page: "spec/runner.mustache"
          #parallel: 4
          launch_in_dev: ["PhantomJS", "Chrome"]
          launch_in_ci:  ["PhantomJS"]

    connect:
      server:
        options:
          port: 9000
          base: "public"
          middleware: (connect, options) ->
            [
              connect.static(options.base)
              require("grunt-connect-proxy/lib/utils").proxyRequest
            ]
      proxies: [
        context: "/api"
        host: "localhost"
        port: 3000
        changeOrigin: true
      ]

  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks)
  grunt.registerTask "default", ["configureProxies", "connect:server", "watch"]
