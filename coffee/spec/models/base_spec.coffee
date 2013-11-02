describe "model.Base", ->

  describe "override Model.sync", ->
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

    it "set storage fetched data", ->
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

  describe "override Model.sync (specified idAttribute model)", ->
    user = null
    server = null


    class User extends myapp.model.Base
      idAttribute: "name"
      urlRoot: "/users/"
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

    it "set storage fetched data", ->
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

  describe "set Storage", ->

    it "set sessionStorage", ->
      class User extends myapp.model.Base
        urlRoot: "/users/"
        storageType: "session"
      user = new User id: 1
      expect(user.storage.storage.type).to.be('session')
      expect(user.storage.key).to.be "model:User:1"

    it "set localStorage", ->
      class User extends myapp.model.Base
        urlRoot: "/users/"
        storageType: "local"
      user = new User id: 1
      expect(user.storage.storage.type).to.be('local')

    it "invalid storageType", ->
      class User extends myapp.model.Base
        urlRoot: "/users/"
        storageType: "locallll"
      newUser = ->
        user = new User id: 1
      expect(newUser).to.throwException /storageType is allowed/

