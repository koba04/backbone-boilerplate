describe "view.layout.Error", ->

  errorView = null
  beforeEach ->
    errorView = new myapp.view.layout.Error()

  it "ErrorView extends Marionette.Layout", ->
    expect(errorView).to.be.a Backbone.Marionette.Layout

  it "template is layouts/error", ->
    expect(errorView.template).to.be JST['layouts/error']

