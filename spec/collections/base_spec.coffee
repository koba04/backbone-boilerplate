describe("collection.Base", ->

  User = myapp.model.Base.extend
    urlRoot: "/users/"
    sync: myapp.util.CacheSync.sync
    initialize: (attrs) ->
      @createStorage "model:user:#{attrs.id}"

  Users = myapp.collection.Base.extend
    url: "/users/"
    sync: myapp.util.CacheSync.sync
    model: User
    initialize: (attrs) ->
      @createStorage "collection:users"

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
      spy = sinon.spy users.storage, 'set'
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
      users.storage.set datas
      expect(users.storage.get()).to.be.eql datas
#      user1 = new User id: 1
#      expect(user1.storage.get()).to.be.eql id:1, name:"jim", age: 21
#      user2 = new User id: 2
#      expect(user2.storage.get()).to.be.eql id:2, name:"bob", age: 18
)
