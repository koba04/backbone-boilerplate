describe "Router", ->

  router = new myapp.Router()

  # restore window.location.hash
  after ->
    router.assign "/"

  beforeEach ->
    sinon.spy Backbone.history, "navigate"
  afterEach ->
    Backbone.history.navigate.restore()

  describe "initialize", ->
    it "extend Backbone.Marionette.AppRouter", ->
      expect(router).to.be.a Backbone.Marionette.AppRouter

  describe "controller", ->
    it "set myapp.Controller", ->
      expect(router.controller).to.be myapp.Controller

  describe "assign", ->
    beforeEach ->
      router.assign "/test/"
    it "Changed location.hash", ->
      expect(Backbone.history.navigate.calledOnce).to.be.ok()
      expect(Backbone.history.navigate.getCall(0).args).to.be.eql [
        "#/test/"
        {replace: false}
      ]

  describe "replace", ->
    beforeEach ->
      router.replace "/test2/"
    it "Changed location.hash", ->
      expect(Backbone.history.navigate.calledOnce).to.be.ok()
      expect(Backbone.history.navigate.getCall(0).args).to.be.eql [
        "#/test2/"
        {replace: true}
      ]

