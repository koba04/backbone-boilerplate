describe "collection.Base", ->

  describe "sync cache", ->
    users = null
    server = null

    User = myapp.model.Base.extend
      urlRoot: "/users/"
      sync: myapp.app.sync
      initialize: (attrs) ->
        @setStorage "model:user:#{attrs.id}"

    Users = myapp.collection.Base.extend
      url: "/users/"
      sync: myapp.app.sync
      model: User
      initialize: (attrs) ->
        @setStorage "collection:users"

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
      myapp.util.sessionStorage.clear()

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
      user1 = new User id: 1
      expect(user1.storage.get()).to.be.eql id:1, name:"jim", age: 21
      user2 = new User id: 2
      expect(user2.storage.get()).to.be.eql id:2, name:"bob", age: 18

  describe "sync cache (specified idAttribute model)", ->
    users = null
    server = null

    User = myapp.model.Base.extend
      urlRoot: "/users/"
      sync: myapp.app.sync
      idAttribute: "name"
      initialize: (attrs) ->
        @setStorage "model:user:#{attrs.name}"

    Users = myapp.collection.Base.extend
      url: "/users/"
      sync: myapp.app.sync
      model: User
      initialize: (attrs) ->
        @setStorage "collection:users"

    before ->
      server = sinon.fakeServer.create()
      server.respondWith "GET", /\/users\//, [
        200, {}, JSON.stringify [
          { name: "jim", age: 21 }
          { name: "bob", age: 18 }
        ]
      ]

    after ->
      server.restore()
      myapp.util.sessionStorage.clear()

    beforeEach ->
      users = new Users()

    it "override sync method", ->
      spy = sinon.spy users.storage, 'set'
      users.fetch()
      server.respond()
      expect(spy.calledOnce).to.be.ok()
      expect(spy.args[0]).to.be.eql [
        [
          { name: "jim", age: 21 }
          { name: "bob", age: 18 }
        ]
        "read"
      ]
      spy.reset()

    it "set, get and remove storage", ->
      datas = [
        { name: "jim", age: 21 }
        { name: "bob", age: 18 }
      ]
      users.storage.set datas
      expect(users.storage.get()).to.be.eql datas
      user1 = new User name: "jim"
      expect(user1.storage.get()).to.be.eql name:"jim", age: 21
      user2 = new User name: "bob"
      expect(user2.storage.get()).to.be.eql name:"bob", age: 18

  describe "set Storage", ->

    Users = myapp.collection.Base.extend
      url: "/users/"

    it "set sessionStorage (default)", ->
      users = new Users()
      users.setStorage "hoge"
      expect(users.storage.storage.type).to.be('session')

    it "set localStorage", ->
      users = new Users()
      users.setStorage "hoge", 'local'
      expect(users.storage.storage.type).to.be('local')

