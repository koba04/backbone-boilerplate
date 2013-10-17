describe "App", ->

  app = myapp.app

  describe "sync", ->
    storageData = {}
    # Dummy Class
    class Storage
      constructor: (@key) ->
      get: -> storageData[@key]
      set: (data, method) -> storageData[@key] = data
      remove: -> storageData[@key] = null

    SaveModel = Backbone.Model.extend
      urlRoot: "/test/"
      sync: app.sync
      initialize: (attrs) ->
        @storage = new Storage "savemodel:#{attrs.id}" if attrs?

    describe "set and get storage", ->
      model = null
      response = null
      server = null
      spy = null

      before ->
        model = new SaveModel id: 1, name: "jim"
        response =
          id: 1
          name: "jim"
          message: "hello world"
        server = sinon.fakeServer.create()
        server.respondWith "GET", /\/test\/1/, [
          200, {}, JSON.stringify response
        ]

      after ->
        server.restore()

      beforeEach ->
        spy = sinon.spy()

      afterEach ->
        spy.reset()

      it "call success callback", ->
        model.fetch success: spy
        server.respond()
        expect(spy.calledOnce).to.ok()

      it "save storage", ->
        model.fetch success: spy
        server.respond()
        expect(spy.calledOnce).to.be.ok()
        expect(storageData["savemodel:1"]).to.eql response

      it "return from storage", ->
        storageData["savemodel:1"].message = "good night"
        model.fetch success: spy
        server.respond()
        expect(spy.calledOnce).to.be.ok()
        expect(storageData["savemodel:1"].message).to.be "good night"

      it "if remove storage data, call API and save on storage", ->
        storageData["savemodel:1"] = null
        model.fetch success: spy
        server.respond()
        expect(spy.calledOnce).to.be.ok()
        expect(storageData["savemodel:1"]).to.eql response

      it "no saved model", ->
        storageData = {}
        model.storage = null
        model.fetch success: spy
        server.respond()
        expect(spy.calledOnce).to.ok()
        expect(storageData).to.empty()

    describe "case POST, PUT, DELETE method", ->
      model = null
      server = null
      spy = null

      before ->
        server = sinon.fakeServer.create()
        server.respondWith "POST", /\/test\//, [
          200, {}, JSON.stringify id: 1, name: "jim", message: "post request"
        ]
        server.respondWith "PUT", /\/test\/1/, [
          200, {}, JSON.stringify id: 1, name: "tom", message: "put request"
        ]
        server.respondWith "DELETE", /\/test\/1/, [
          200, {}, JSON.stringify message: "ok"
        ]

      after ->
        server.restore()

      beforeEach ->
        model = new SaveModel id: 1, name: "jim"
        spy = sinon.spy()

      afterEach ->
        spy.reset()

      it "method POST", ->
        model = new SaveModel name: "jim"
        model.storage = new Storage "savemodel:1"
        model.save {}, success: spy
        server.respond()
        expect(spy.calledOnce).to.ok()
        expect(storageData["savemodel:1"]).to.eql id:1, name:"jim", message:"post request"
        expect(model.get("message")).to.be "post request"

      it "method PUT", ->
        model.set "name", "tom"
        model.save {}, success: spy
        server.respond()
        expect(spy.calledOnce).to.ok()
        expect(storageData["savemodel:1"]).to.eql id:1, name:"tom", message:"put request"
        expect(model.get("message")).to.be "put request"

      it "method DELETE", ->
        model.set "name", "tom"
        model.save {}, success: ->
        server.respond()
        model.destroy success: spy
        server.respond()
        expect(spy.calledOnce).to.ok()
        expect(storageData["savemodel:1"]).to.be null

    describe "app.sync()", ->
      it "throw exception", ->
        fn = ->
          app.sync()
        expect(fn).to.throwError /^sync method/

