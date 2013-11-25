describe "view.item.Friend", ->

  friendView = null
  beforeEach ->
    friendView = new myapp.view.item.Friend()

  it "friendView extends Marionette.ItemView", ->
    expect(friendView).to.be.a Backbone.Marionette.ItemView

  it "template is items/friend", ->
    expect(friendView.template).to.be JST['items/friend']

