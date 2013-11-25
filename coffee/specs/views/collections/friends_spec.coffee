describe "view.collection.Friends", ->

  friendsView = null
  beforeEach ->
    friendsView = new myapp.view.collection.Friends()

  it "FriendsView exnteds Marionette.CollectionView", ->
    expect(friendsView).to.be.a Backbone.Marionette.CollectionView

  it "FriendsView has view.item.Friend as ItemView", ->
    expect(friendsView.itemView).to.be myapp.view.item.Friend

