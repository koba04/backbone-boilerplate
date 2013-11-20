describe "collection.Base", ->

  describe "CollectionStorage", ->
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

    it "Storage is empty", ->
      expect(users.storage.get()).to.be.eql undefined

    it "Save to storage fetched data", ->
      sinon.spy users.storage, 'set'
      users.fetch()
      server.respond()
      expect(users.storage.set.called).to.be.ok()
      expect(users.storage.set.getCall(0).args).to.be.eql [
        [
          { id: 1, name: "jim", age: 21 }
          { id: 2, name: "bob", age: 18 }
        ]
      ]
      users.storage.set.restore()

    it "Get storage data and remove", ->
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

    describe "When trigger events, update storage data", ->
      beforeEach ->
        users.fetch()
        server.respond()
        users.storage.remove()

      it "When 'add' event, set storage", ->
        users.trigger "add"
        expect(users.storage.get()).to.be.eql users.toJSON()

      it "When 'remove' event, set storage", ->
        users.trigger "remove"
        expect(users.storage.get()).to.be.eql users.toJSON()

      it "When 'reset' event, set storage", ->
        users.trigger "reset"
        expect(users.storage.get()).to.be.eql users.toJSON()

      it "When 'destroy' event, remove storage data", ->
        users.trigger "reset"
        users.trigger "destroy"
        expect(users.storage.get()).to.be.eql undefined

  describe "Specify idAttribute model", ->
    users = null
    server = null

    class User extends myapp.model.Base
      urlRoot: "/users/"
      storageType: "session"
      idAttribute: "name"

    class Users extends myapp.collection.Base
      url: "/users/"
      storageType: "session"
      model: User

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

    it "Save to storage", ->
      sinon.spy users.storage, 'set'
      users.fetch()
      server.respond()
      expect(users.storage.set.called).to.be.ok()
      expect(users.storage.set.getCall(0).args).to.be.eql [
        [
          { name: "jim", age: 21 }
          { name: "bob", age: 18 }
        ]
      ]
      users.storage.set.restore()

    it "Get storage data and remove", ->
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

  describe "Specify storage", ->
    Users = null
    beforeEach ->
      class Users extends myapp.collection.Base
        url: "/users/"
        model: myapp.model.Base
        storageType: "session"

    it "Set sessionStorage", ->
      users = new Users()
      expect(users.storage.storage.type).to.be "session"

    it "Set localStorage", ->
      Users::storageType = "local"
      users = new Users()
      expect(users.storage.storage.type).to.be "local"

    it "Throw Exception when invalid storageType ", ->
      Users::storageType = "l"
      newUsers = ->
        users = new Users id: 1
      expect(newUsers).to.throwException /storageType is allowed/
