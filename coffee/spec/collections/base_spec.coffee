describe "collection.Base", ->

  describe "override Collection.sync", ->
    users = null
    server = null

    class User extends myapp.model.Base
      urlRoot: "/users/"
      storageType: "session"

    class Users extends myapp.collection.Base
      url: "/users/"
      model: User
      storageType: "session"

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

    it "set storage fetched data", ->
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

    it "storage can set, get and remove", ->
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

      users.storage.remove()
      expect(users.storage.get()).to.be.eql undefined
      expect(user1.storage.get()).to.be.eql undefined
      expect(user2.storage.get()).to.be.eql undefined

  describe "override Collection.sync (specified idAttribute model)", ->
    users = null
    server = null

    class User extends myapp.model.Base
      idAttribute: "name"
      initialize: (attrs) ->
        @urlRoot = "/users/"
        @storageType = "session"
        super

    class Users extends myapp.collection.Base
      url: "/users/"
      model: User
      storageType: "session"

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

    it "set storage fetched data", ->
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

    it "storage can set, get and remove", ->
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

      users.storage.remove()
      expect(users.storage.get()).to.be.eql undefined
      expect(user1.storage.get()).to.be.eql undefined
      expect(user2.storage.get()).to.be.eql undefined

  describe "storage", ->

    it "set sessionStorage", ->
      class Users extends myapp.collection.Base
        storageType: "session"
      users = new Users()
      expect(users.storage.storage.type).to.be "session"
      expect(users.storage.key).to.be "collection:Users"
      expect(users.storage.model).to.be users.model

    it "set localStorage", ->
      class Users extends myapp.collection.Base
        storageType: "local"
      users = new Users()
      expect(users.storage.storage.type).to.be "local"

    it "invalid storageType", ->
      class Users extends myapp.collection.Base
        storageType: "sessions"
      newUsers = ->
        users = new Users()
      expect(newUsers).to.throwException /storageType is allowed/


