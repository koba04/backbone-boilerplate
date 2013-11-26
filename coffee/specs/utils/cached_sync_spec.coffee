describe "util.cachedSync", ->

  cachedSync = myapp.util.cachedSync

  storageData = {}
  # Dummy Class
  class Storage
    constructor: (@key) ->
    get: -> storageData[@key]
    set: (data) -> storageData[@key] = data
    remove: -> storageData[@key] = null

  class SaveModel extends Backbone.Model
    urlRoot: "/test/"
    sync: cachedSync
    storageType: "session"
    initialize: (attrs) ->
      @storage = new Storage "savemodel:#{attrs.id}" if attrs?
      @on "change", => @storage.set @toJSON() if @storage
      @on "destroy", => @storage.remove()

  describe "Saved fetched data to Storage", ->
    model = null
    response = null
    server = null
    spy = null

    before ->
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
      model = new SaveModel id: 1, name: "jim"
      spy = sinon.spy()

    afterEach ->
      spy.reset()

    it "Called specified resolve callback", ->
      model.fetch().done spy
      server.respond()
      expect(spy.calledOnce).to.ok()

    it "Save to  storage", ->
      model.fetch().done spy
      server.respond()
      expect(spy.calledOnce).to.be.ok()
      expect(storageData["savemodel:1"]).to.eql response

    it "You can get data from storage and called resolve callback", ->
      storageData["savemodel:1"].message = "good night"
      model.fetch().done spy
      server.respond()
      expect(spy.calledOnce).to.be.ok()
      expect(storageData["savemodel:1"].message).to.be "good night"

    it "Storage data is empty, called Backbone.fetch", ->
      storageData["savemodel:1"] = null
      model.fetch().done spy
      server.respond()
      expect(spy.calledOnce).to.be.ok()
      expect(storageData["savemodel:1"]).to.eql response

    it "Storage isnt defined, dont save to storage", ->
      storageData = {}
      model.storage = null
      model.fetch().done spy
      server.respond()
      expect(spy.calledOnce).to.ok()
      expect(storageData).to.empty()

  describe "Called Backbone.fetch and save response data even get from storage", ->
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
      model.storage.set id: 1, name: "jim"
      spy = sinon.spy()

    afterEach ->
      spy.reset()

    it "POST Request", ->
      model = new SaveModel name: "jim"
      model.storage = new Storage "savemodel:1"
      model.save({}).done spy
      server.respond()
      expect(spy.calledOnce).to.ok()
      expect(storageData["savemodel:1"]).to.eql id:1, name:"jim", message:"post request"
      expect(model.get("message")).to.be "post request"

    it "PUT Request", ->
      model.set "name", "tom"
      model.save({}).done spy
      server.respond()
      expect(spy.calledOnce).to.ok()
      expect(storageData["savemodel:1"]).to.eql id:1, name:"tom", message:"put request"
      expect(model.get("message")).to.be "put request"

    it "DELETE Request", ->
      model.destroy().done spy
      server.respond()
      expect(spy.calledOnce).to.ok()
      expect(storageData["savemodel:1"]).to.be null

