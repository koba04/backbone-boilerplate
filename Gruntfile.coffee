module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")

    coffee:
      compile:
        files:
          "public/js/app.js": [
            "coffee/app.coffee"
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

    connect:
      server:
        options:
          port: 9000
          base: "public"

  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks)
  grunt.registerTask "default", ["connect","watch"]
