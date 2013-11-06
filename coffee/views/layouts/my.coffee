( ->
  'use strict'

  @view.layout.My = Backbone.Marionette.Layout.extend
    template: JST['layouts/my']

).call myapp
