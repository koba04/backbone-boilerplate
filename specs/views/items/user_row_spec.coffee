describe "View.Item.UserRow", ->

  UserRowView = require 'myapp/views/items/user_row'

  view = null
  beforeEach ->
    view = new UserRowView

  it "extends Marionette.ItemView", ->
    expect(view).to.be.a Backbone.Marionette.ItemView

  it "template is items/user_row", ->
    expect(view.template).to.be JST['items/user_row']

