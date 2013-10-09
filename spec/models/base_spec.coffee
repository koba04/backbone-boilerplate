describe "BaseSpec", ->

  User = myapp.model.Base.extend
    urlRoot: "/users/"
    initialize: (attrs) ->
      @storageKey = "model:user:#{attrs.id}"

  describe "sync cache", ->
    user = null
    server = null

    before ->
      server = sinon.fakeServer.create()
      server.respondWith "GET", /\/users\//, [
        200, {}, JSON.stringify id: 1, name: "jim", age: 21
      ]

    after ->
      server.restore()

    beforeEach ->
      user = new User id: 1, name: "jim", age: 20

    it "override sync method", ->
      spy = sinon.spy user, 'saveStorage'
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
      user.saveStorage data
      expect(user.getStorage()).to.be.eql data
      user.removeStorage()
      expect(user.getStorage()).to.be.eql undefined

