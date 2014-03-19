describe "View.Collection.Users", ->

  Backbone    = require 'backbone'
  UsersView   = require 'myapp/views/collections/users'
  UserRowView = require 'myapp/views/items/user_row'

  view = null
  beforeEach ->
    view = new UsersView

  it "exnteds Marionette.CollectionView", ->
    expect(view).to.be.a Backbone.Marionette.CollectionView

  it "has view.item.Friend as ItemView", ->
    expect(view.itemView).to.be UserRowView

