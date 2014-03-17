describe "Controller", ->

  App         = require 'myapp/app'
  Controller  = require 'myapp/controller'
  users       = require 'myapp/collections/users'
  TopView     = require 'myapp/views/layouts/top'
  ErrorView   = require 'myapp/views/layouts/error'


  describe "top", ->
    beforeEach ->
      sinon.stub users, "fetch", -> $.Deferred().resolve().promise()
      Controller.top()
    afterEach ->
      users.fetch.restore()

    it "after fetched users, show TopView in content regions", ->
      expect(App.content.currentView).to.be.a TopView

    it "TopView has users as collection", ->
      expect(App.content.currentView.collection).to.be users

  describe "error", ->
    beforeEach ->
      Controller.error()
    it "show ErrorView in content regions", ->
      expect(App.content.currentView).to.be.a ErrorView
