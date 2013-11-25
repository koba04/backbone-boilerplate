describe "view.layout.My", ->

  myView = null
  beforeEach ->
    myView = new myapp.view.layout.My()

  it "MyView extends Marionette.Layout", ->
    expect(myView).to.be.a Backbone.Marionette.Layout

  it "template is layouts/my", ->
    expect(myView.template).to.be JST['layouts/my']

