describe "views/layouts/error", ->
  expect    = require 'expect.js'
  Backbone  = require 'backbone'
  ErrorView = require 'myapp/views/layouts/error'
  template  = require 'template/layouts/error'

  view = null
  beforeEach ->
    view = new ErrorView

  it "extends Marionette.LayoutView", ->
    expect(view).to.be.a Backbone.Marionette.LayoutView

  it "template is layouts/error", ->
    expect(view.template).to.be template

