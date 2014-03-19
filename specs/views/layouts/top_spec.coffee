describe "view.layout.Top", ->

  TopView   = require 'myapp/views/layouts/top'
  UsersView = require 'myapp/views/collections/users'
  template  = require 'template/layouts/top'

  view = null
  beforeEach ->
    view = new TopView

  it "extends Marionette.Layout", ->
    expect(view).to.be.a Backbone.Marionette.Layout

  it "template is layouts/top", ->
    expect(view.template).to.be template

  describe "onRender", ->
    beforeEach ->
      view.render()
    it "View.Collection.Users added to users regison", ->
      expect(view.users.currentView).to.be.a UsersView
      expect(view.users.currentView.collections).to.be view.collection

