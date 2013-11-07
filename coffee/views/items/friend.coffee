( ->
  'use strict'

  view = @view
  view.item.Friend = Backbone.Marionette.ItemView.extend
    template: JST['items/friend']

).call myapp
