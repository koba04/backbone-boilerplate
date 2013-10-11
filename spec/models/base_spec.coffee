describe("model.Base", ->

  describe "sync cache", ->
    user = null
    server = null

    User = myapp.model.Base.extend
      urlRoot: "/users/"
      initialize: (attrs) ->
        @createStorage "model:user:#{attrs.id}"

    before ->
      server = sinon.fakeServer.create()
      server.respondWith "GET", /\/users\//, [
        200, {}, JSON.stringify id: 1, name: "jim", age: 21
      ]

    after ->
      server.restore()
      myapp.util.Storage.clear()

    beforeEach ->
      user = new User id: 1, name: "jim", age: 20

    it "override sync method", ->
      spy = sinon.spy user.storage, 'set'
      user.fetch()
      server.respond()
      expect(spy.calledOnce).to.be.ok()
      expect(spy.args[0]).to.be.eql [
        id:1, name:"jim", age:21
        "read"
      ]
      spy.reset()

    it "set, get and remove storage", ->
      data = id:1, name:"jim", age:22
      user.storage.set data
      expect(user.storage.get()).to.be.eql data
      user.storage.remove()
      expect(user.storage.get()).to.be.eql undefined

  describe "sync cache (specified idAttribute model)", ->
    user = null
    server = null

    User = myapp.model.Base.extend
      urlRoot: "/users/"
      idAttribute: "name"
      initialize: (attrs) ->
        @createStorage "model:user:#{attrs.name}"

    before ->
      server = sinon.fakeServer.create()
      server.respondWith "GET", /\/users\/jim/, [
        200, {}, JSON.stringify name: "jim", age: 21
      ]

    after ->
      server.restore()
      myapp.util.Storage.clear()

    beforeEach ->
      user = new User name: "jim", age: 20

    it "override sync method", ->
      spy = sinon.spy user.storage, 'set'
      user.fetch()
      server.respond()
      expect(spy.calledOnce).to.be.ok()
      expect(spy.args[0]).to.be.eql [
        name:"jim", age:21
        "read"
      ]
      spy.reset()

    it "set, get and remove storage", ->
      data = name:"jim", age:22
      user.storage.set data
      expect(user.storage.get()).to.be.eql data

      jim = new User name: "jim"
      expect(jim.storage.get()).to.be.eql data

      user.storage.remove()
      expect(user.storage.get()).to.be.eql undefined


)
