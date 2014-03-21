describe "views/items/track", ->
  expect      = require 'expect.js'
  Backbone    = require 'backbone'
  TrackView   = require 'myapp/views/items/track'
  template    = require 'template/items/track'

  view = null
  beforeEach ->
    view = new TrackView

  it "extends Marionette.ItemView", ->
    expect(view).to.be.a Backbone.Marionette.ItemView

  it "template is items/track", ->
    expect(view.template).to.be template

