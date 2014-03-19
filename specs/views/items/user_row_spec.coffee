describe "View.Item.UserRow", ->

  UserRowView = require 'myapp/views/items/user_row'
  template    = require 'template/items/user_row'

  view = null
  beforeEach ->
    view = new UserRowView

  it "extends Marionette.ItemView", ->
    expect(view).to.be.a Backbone.Marionette.ItemView

  it "template is items/user_row", ->
    expect(view.template).to.be template

