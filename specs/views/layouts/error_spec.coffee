describe "views/layouts/error", ->
  assert    = require 'power-assert'
  Backbone  = require 'backbone'
  ErrorView = require 'myapp/views/layouts/error'
  template  = require 'template/layouts/error'

  view = null
  beforeEach ->
    view = new ErrorView

  it "extends Marionette.LayoutView", ->
    assert.ok view instanceof Backbone.Marionette.LayoutView

  it "template is layouts/error", ->
    assert.ok view.template is template

