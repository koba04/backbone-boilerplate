( ->
  'use strict'

  view = @view
  collection = @collection
  view.layout.Friends = Backbone.Marionette.Layout.extend
    template: JST['layouts/friends']
    regions:
      friends: "#friends"

    show: ->
      users = new collection.Users()
      users.fetch success: =>
        myapp.App.content.show @
        @friends.show new view.collection.Friends collection: users

).call myapp
