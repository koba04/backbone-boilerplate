describe "collection.Base", ->

  User = myapp.model.Base.extend
    urlRoot: "/users/"
    initialize: (attrs) ->
      @storageKey = "model:user:#{attrs.id}"

  Users = myapp.collection.Base.extend
    url: "/users/"
    storageKey: "collection:users"
    model: User

  describe "sync cache", ->
    users = null
    server = null

    before ->
      server = sinon.fakeServer.create()
      server.respondWith "GET", /\/users\//, [
        200, {}, JSON.stringify [
          { id: 1, name: "jim", age: 21 }
          { id: 2, name: "bob", age: 18 }
        ]
      ]

    after ->
      server.restore()
      myapp.util.Storage.clear()

    beforeEach ->
      users = new Users()

    it "override sync method", ->
      spy = sinon.spy users, 'saveStorage'
      users.fetch()
      server.respond()
      expect(spy.calledOnce).to.be.ok()
      expect(spy.args[0]).to.be.eql [
        [
          { id: 1, name: "jim", age: 21 }
          { id: 2, name: "bob", age: 18 }
        ]
        "read"
      ]
      spy.reset()

    it "set, get and remove storage", ->
      datas = [
        { id: 1, name: "jim", age: 21 }
        { id: 2, name: "bob", age: 18 }
      ]
      users.saveStorage datas
      expect(users.getStorage()).to.be.eql datas
      user1 = new User id: 1
      expect(user1.getStorage()).to.be.eql id:1, name:"jim", age: 21
      user2 = new User id: 2
      expect(user2.getStorage()).to.be.eql id:2, name:"bob", age: 18

