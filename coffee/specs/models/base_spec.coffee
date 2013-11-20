describe "model.Base", ->

  describe "ModelStorage", ->
    user = null
    server = null

    class User extends myapp.model.Base
      urlRoot: "/users/"
      storageType: "session"

    before ->
      server = sinon.fakeServer.create()
      server.respondWith "GET", /\/users\//, [
        200, {}, JSON.stringify id: 1, name: "jim", age: 21
      ]

    after ->
      server.restore()
      myapp.util.sessionStorage.clear()

    beforeEach ->
      user = new User id: 1, name: "jim", age: 20

    it "Storage is empty", ->
      expect(user.storage.get()).to.be.eql undefined

    it "Save to storage fetched data", ->
      sinon.spy user.storage, 'set'
      user.fetch()
      server.respond()
      expect(user.storage.set.calledOnce).to.be.ok()
      expect(user.storage.set.getCall(0).args).to.be.eql [
        id:1, name:"jim", age:21
      ]
      user.storage.set.restore()

    it "Get storage data and remove", ->
      data = id:1, name:"jim", age:22
      user.storage.set data
      expect(user.storage.get()).to.be.eql data

    it "When trigger 'change' event, save model data to storage", ->
      user.trigger "change"
      expect(user.storage.get()).to.be.eql user.toJSON()

    it "When trigger 'destroy' event, remove storage data", ->
      user.trigger "destroy"
      expect(user.storage.get()).to.be.eql undefined

  describe "Specify idAttribute model", ->
    user = null
    server = null

    class User extends myapp.model.Base
      urlRoot: "/users/"
      idAttribute: "name"
      storageType: "session"

    before ->
      server = sinon.fakeServer.create()
      server.respondWith "GET", /\/users\/jim/, [
        200, {}, JSON.stringify name: "jim", age: 21
      ]

    after ->
      server.restore()
      myapp.util.sessionStorage.clear()

    beforeEach ->
      user = new User name: "jim", age: 20

    it "Save to storage", ->
      sinon.spy user.storage, 'set'
      user.fetch()
      server.respond()
      expect(user.storage.set.calledOnce).to.be.ok()
      expect(user.storage.set.getCall(0).args).to.be.eql [
        name:"jim", age:21
      ]
      user.storage.set.restore()

    it "Get storage data and remove", ->
      data = name:"jim", age:22
      user.storage.set data
      expect(user.storage.get()).to.be.eql data

      jim = new User name: "jim"
      expect(jim.storage.get()).to.be.eql data

      user.trigger "destroy"
      expect(user.storage.get()).to.be.eql undefined

  describe "Specify storage", ->
    User = null
    beforeEach ->
      class User extends myapp.model.Base
        urlRoot: "/users/"
        storageType: "session"

    it "Set sessionStorage", ->
      user = new User id: 1
      expect(user.storage.storage.type).to.be "session"

    it "Set localStorage", ->
      User::storageType = "local"
      user = new User id: 1
      expect(user.storage.storage.type).to.be "local"

    it "When create instance do not specify ID, storage key is not used 'Id'", ->
      user = new User()
      expect(user.storage.key).to.be "model:User:"

    it "Throw Exception when invalid storageType ", ->
      User::storageType = "localll"
      newUser = ->
        user = new User id: 1
      expect(newUser).to.throwException /storageType is allowed/
