( ->
  'use strict'

  view = @view
  class view.collection.Friends extends Backbone.Marionette.CollectionView
    itemView: view.item.Friend

).call myapp
