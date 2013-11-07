( ->
  'use strict'

  view = @view
  view.collection.Friends = Backbone.Marionette.CollectionView.extend
    itemView: view.item.Friend

).call myapp
