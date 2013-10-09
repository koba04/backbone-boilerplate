describe "CacheSync", ->
  storage = {}
  # Dummy Class
  SaveModel = Backbone.Model.extend
    urlRoot: "/test/"
    sync: myapp.util.CacheSync.sync
    initialize: (attrs) -> @storageKey = "savemodel:#{attrs.id}" if attrs?
    getStorage: -> storage[@storageKey] if @storageKey
    saveStorage: (method, data) -> storage[@storageKey] = data
    removeStorage: ->
      delete storage[@storageKey]

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
      expect(storage[model.storageKey]).to.eql response

    it "return from storage", ->
      storage[model.storageKey].message = "good night"
      model.fetch success: spy
      server.respond()
      expect(spy.calledOnce).to.be.ok()
      expect(storage[model.storageKey].message).to.be "good night"

    it "if remove storage data, call API and save on storage", ->
      delete storage[model.storageKey]
      model.fetch success: spy
      server.respond()
      expect(spy.calledOnce).to.be.ok()
      expect(storage[model.storageKey]).to.eql response

    it "no saved model", ->
      storage = {}
      model.storageKey = null
      model.fetch success: spy
      server.respond()
      expect(spy.calledOnce).to.ok()
      expect(storage).to.empty()

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
      model.save {}, success: spy
      server.respond()
      expect(spy.calledOnce).to.ok()
      expect(storage[model.storageKey]).to.eql id:1, name:"jim", message:"post request"
      expect(model.get("message")).to.be "post request"

    it "method PUT", ->
      model.set "name", "tom"
      model.save {}, success: spy
      server.respond()
      expect(spy.calledOnce).to.ok()
      expect(storage[model.storageKey]).to.eql id:1, name:"tom", message:"put request"
      expect(model.get("message")).to.be "put request"

    it "method DELETE", ->
      model.set "name", "tom"
      model.save {}, success: ->
      storageKey = model.storageKey
      server.respond()
      model.destroy success: spy
      server.respond()
      expect(spy.calledOnce).to.ok()
      expect(storage[storageKey]).to.be undefined

