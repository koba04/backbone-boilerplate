describe "collection.Users", ->

  collection = myapp.collection
  model = myapp.model

  describe "properties", ->
    users = null
    beforeEach ->
      users = new collection.Users()

    it "url is /users/", ->
      expect(users.url).to.be "/users/"

    it "model is model.User", ->
      expect(users.model).to.be model.User

    it "storageType is session", ->
      expect(users.storageType).to.be "session"

