describe "views/items/track", ->
  assert      = require 'power-assert'
  Backbone    = require 'backbone'
  TrackView   = require 'myapp/views/items/track'
  template    = require 'template/items/track'

  view = null
  beforeEach ->
    view = new TrackView

  it "extends Marionette.ItemView", ->
    assert.ok view instanceof Backbone.Marionette.ItemView

  it "template is items/track", ->
    assert.ok view.template is template

