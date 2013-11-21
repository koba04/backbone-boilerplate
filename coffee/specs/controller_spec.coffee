describe "Controller", ->

  view = myapp.view
  model = myapp.model
  App = myapp.App
  Controller = myapp.Controller

  beforeEach ->
    sinon.spy App.content, "show"
  afterEach ->
    App.content.show.restore()

  describe "top", ->
    beforeEach ->
      Controller.top()

    it "show TopView", ->
      expect(App.content.show.calledOnce).to.be.ok()
      expect(App.content.show.args[0][0]).to.be.a view.layout.Top

  describe "error", ->
    beforeEach ->
      Controller.error()

    it "show ErrorView", ->
      expect(App.content.show.calledOnce).to.be.ok()
      expect(App.content.show.args[0][0]).to.be.a view.layout.Error

  describe "my", ->
    beforeEach ->
      sinon.stub(model.User.prototype, "fetch").yieldsTo "success", {}
      Controller.my()
    afterEach ->
      model.User.prototype.fetch.restore()

    it "show MyView", ->
      expect(App.content.show.calledOnce).to.be.ok()
      expect(App.content.show.args[0][0]).to.be.a view.layout.My
      expect(App.content.show.args[0][0].model).to.be.a model.User

  describe "friends", ->
    beforeEach ->
      sinon.stub view.layout.Friends.prototype, "show"
      Controller.friends()
    afterEach ->
      view.layout.Friends.prototype.show.restore()

    it "show FriendsView", ->
      expect(view.layout.Friends.prototype.show.calledOnce).to.be.ok()

