module.exports = (grunt) ->

  proxyHost = if grunt.option('proxy_host')? then grunt.option('proxy_host') else null

  # product static server. cf, CDN...
  staticHost = "http://example.com"

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
      develop:
        files: "public/js/template.js": ["template/**/*.hbs"]
      product:
        files: "public/js/template.product.js": ["template/**/*.hbs"]
        options:
          processContent: (content) -> content.replace /src="(.*)?"/gm, "src=\"#{staticHost}$1\""

    compass:
      options:
        bundleExec: true
        sassDir: "scss"
        imageDir: "img"
      product:
        options:
          httpPath: staticHost
          httpStylesheetsPath: "#{staticHost}/css"
          cssDir: "public/css/product"
          noLineComments: true
          outputStyle: "compressed"
      develop:
        options:
          httpPath: "/"
          httpStylesheetsPath: "/css"
          cssDir: "public/css"
          noLineComments: false
          outputStyle: "expanded"

    concat:
      vendorJS:
        src: [
          "bower_components/jquery/jquery.min.js"
          "bower_components/underscore/underscore-min.js"
          "bower_components/backbone/backbone-min.js"
          "bower_components/marionette/lib/backbone.marionette.min.js"
          "bower_components/handlebars/handlebars.js"
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
      assemble:
        files: "assemble/**/*"
        tasks: ["assemble"]

    assemble:
      term:
        options:
          ext: ".hbs"
          data: "assemble/data/term.yaml"
          layout: "assemble/layout/term.hbs"
        files: [
          expand: true
          cwd: "assemble/template/term"
          src: "**/*.hbs"
          dest: "template/term"
        ]
      publicHTMLDevelop:
        options:
          product: false
          jsVersion: 1
          cssVersion: 1
        files: [
          src: "assemble/template/public_html/index.hbs"
          dest: "public/index.html"
        ]
      publicHTMLProduct:
        options:
          product: true
          jsVersion: 1
          cssVersion: 1
          staticHost: staticHost
        files: [
          src: "assemble/template/public_html/index.hbs"
          dest: "public/index.product.html"
        ]

    testem:
      app:
        src: [
          "bower_components/expect/expect.js"
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
        host: if proxyHost? then proxyHost  else "localhost"
        port: if proxyHost? then 80         else 3000
        changeOrigin: true
      ]

  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks)
  grunt.loadNpmTasks "assemble"

  grunt.registerTask "default", ["configureProxies", "connect:server", "watch"]
