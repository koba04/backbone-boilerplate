describe "model.User", ->

  user = null
  beforeEach ->
    user = new myapp.model.User name: "jim"

  describe "properties", ->

    it "urlRoot is /users/", ->
      expect(user.urlRoot).to.be "/users/"

    it "storageType is session", ->
      expect(user.storageType).to.be "session"

    it "name property set by initialize", ->
      expect(user.get("name")).to.be "jim"

