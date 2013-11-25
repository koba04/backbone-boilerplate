describe "view.layout.Friends", ->

  friendsView = null
  beforeEach ->
    friendsView = new myapp.view.layout.Friends()

  describe "property", ->
    it "FriendsView extends Marionette.Layout", ->
      expect(friendsView).to.be.a Backbone.Marionette.Layout

    it "template is layouts/friends", ->
      expect(friendsView.template).to.be JST['layouts/friends']

  describe "regions", ->
    it "friends is a #friends", ->
      expect(friendsView.friends).to.be.a Backbone.Marionette.Region
      expect(friendsView.friends.el).to.be "#friends"

  describe "show", ->
    server = null
    before ->
      server = sinon.fakeServer.create()
      server.respondWith "GET", /\/users\//, [
        200, {}, JSON.stringify [
          { id: 1, name: "jim" }, { id: 2, name: "bob" }
        ]
      ]
    after ->
      server.restore()

    beforeEach ->
      sinon.spy myapp.App.content, "show"
      sinon.spy friendsView.friends, "show"
      friendsView.show()
      server.respond()

    afterEach ->
      myapp.App.content.show.restore()
      friendsView.friends.show.restore()

    it "show method render collection.Friends to friends region", ->
      expect(myapp.App.content.show.calledOnce).to.be.ok()
      expect(friendsView.friends.show.calledOnce).to.be.ok()
      expect(friendsView.friends.show.args[0][0]).to.be.a myapp.view.collection.Friends
      expect(friendsView.friends.show.args[0][0].collection).to.be.a myapp.collection.Users
      expect(friendsView.friends.show.args[0][0].collection.toJSON()).to.be.eql [
          { id: 1, name: "jim" }, { id: 2, name: "bob" }
      ]

