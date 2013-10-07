module.exports = (grunt) ->

  proxyHost = if grunt.option('proxy_host')? then grunt.option('proxy_host') else null
  grunt.log.write "Proxy => #{proxyHost}"

  # product static server. cf, CDN...
  staticHost = "http://example.com"

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
      options:
        namespace: "<%= pkg.name %>.JST"
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
          "bower_components/zepto/zepto.min.js"
          "bower_components/lodash/dist/lodash.min.js"
          "bower_components/backbone/backbone-min.js"
          "bower_components/handlebars/handlebars.js"
          "bower_components/jsdeferred/jsdeferred.js"
        ]
        dest: "public/js/vendor.js"

    removelogging:
      product:
        src: "public/js/app.js"
        dest: "public/js/app.product.js"

    uglify:
      product:
        files: "public/js/app.product.js": ["public/js/app.product.js"]

    watch:
      options:
        livereload: true
      coffee:
        files: "coffee/**/*.coffee"
        tasks: ["coffee2js"]
      handlebars:
        files: "template/**/*.hbs"
        tasks: ["handlebars"]
      scss:
        files: "scss/**/*.scss"
        tasks: ["compass"]

    assemble:
      options:
        ext: ".hbs"
      term:
        options:
          data: "assemble/data/term.yaml"
          layout: "assemble/layout/term.hbs"
        files: [
          expand: true
          cwd: "assemble/template/term"
          src: "**/*.hbs"
          dest: "template/sub/term"
        ]

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
        host: if proxyHost? then proxyHost  else "localhost"
        port: if proxyHost? then 80         else 3000
        changeOrigin: true
      ]

  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks)
  grunt.loadNpmTasks "assemble"

  grunt.registerTask "coffee2js", ["coffee", "removelogging", "uglify"]
  grunt.registerTask "default", ["configureProxies", "connect:server", "watch"]
