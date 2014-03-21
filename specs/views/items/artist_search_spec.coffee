describe "views/items/artist_search", ->
  expect            = require 'expect.js'
  Backbone          = require 'backbone'
  ArtistSearchView  = require 'myapp/views/items/artist_search'
  template          = require 'template/items/artist_search'

  view = null
  beforeEach ->
    view = new ArtistSearchView

  it "extends Marionette.ItemView", ->
    expect(view).to.be.a Backbone.Marionette.ItemView

  it "template is items/artist_search", ->
    expect(view.template).to.be template

