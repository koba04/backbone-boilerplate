describe "CacheSync", ->
  storage = {}
  # Dummy Class
  SaveModel = Backbone.Model.extend
    urlRoot: "/test/"
    sync: myapp.util.CacheSync.sync
    initialize: (attrs) -> @storageKey = "savemodel:#{attrs.id}"
    getStorage: -> storage[@storageKey]
    saveStorage: (method, data) -> storage[@storageKey] = data
    removeStorage: -> delete storage[@storageKey]

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
      server.respondWith("GET", "/test/1", [
        200,
        {},
        JSON.stringify response
      ])

    beforeEach ->
      spy = sinon.spy()

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

    afterEach ->
      spy.reset()

    after ->
      server.restore()

  describe "case POST, PUT, DELETE method", ->
