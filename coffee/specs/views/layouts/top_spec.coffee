describe "view.layout.Top", ->

  topView = null
  beforeEach ->
    topView = new myapp.view.layout.Top()

  it "TopView extends Marionette.Layout", ->
    expect(topView).to.be.a Backbone.Marionette.Layout

  it "template is layouts/top", ->
    expect(topView.template).to.be JST['layouts/top']

