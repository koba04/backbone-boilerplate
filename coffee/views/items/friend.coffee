( ->
  'use strict'

  view = @view
  class view.item.Friend extends Backbone.Marionette.ItemView
    template: JST['items/friend']

).call myapp
