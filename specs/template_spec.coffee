describe "template", ->
  expect    = require 'expect.js'
  template  = require 'myapp/template'

  describe "helper", ->

    describe "equal", ->
      it "a is b, invoke options.fn", (done) ->
        template.helper.equal(
          "a"
          "a"
            fn: -> done()
            inverse: ->
        )

      it "a isnt b, invoke options.inverse", (done) ->
        template.helper.equal(
          "a"
          "b"
            fn: ->
            inverse: -> done()
        )


