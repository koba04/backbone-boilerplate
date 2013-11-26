( ->
  'use strict'

  view = @view
  collection = @collection
  class view.layout.Friends extends Backbone.Marionette.Layout
    template: JST['layouts/friends']
    regions:
      friends: "#friends"

    show: ->
      users = new collection.Users()
      users.fetch().done =>
        myapp.App.content.show @
        @friends.show new view.collection.Friends collection: users

).call myapp
