describe "View.Layout.Error", ->

  ErrorView = require 'myapp/views/layouts/error'

  view = null
  beforeEach ->
    view = new ErrorView

  it "extends Marionette.Layout", ->
    expect(view).to.be.a Backbone.Marionette.Layout

  it "template is layouts/error", ->
    expect(view.template).to.be JST['layouts/error']

