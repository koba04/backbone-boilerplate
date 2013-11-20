describe "App", ->

  App = myapp.App

  describe "initialize", ->
    it "App isa Backbone.Marionette.Application", ->
      expect(App).to.be.a Backbone.Marionette.Application

  describe "start", ->
    it "Set Router instance to App.router", ->
      expect(App.router).to.be.a myapp.Router
