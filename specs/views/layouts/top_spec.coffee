describe "views/layouts/top", ->
  expect    = require 'expect.js'
  Backbone  = require 'backbone'
  TopView   = require 'myapp/views/layouts/top'
  template  = require 'template/layouts/top'

  view = null
  beforeEach ->
    view = new TopView

  it "extends Marionette.Layout", ->
    expect(view).to.be.a Backbone.Marionette.Layout

  it "template is layouts/top", ->
    expect(view.template).to.be template

