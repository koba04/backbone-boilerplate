'use strict'

Backbone  = require 'backbone'
UsersView = require 'myapp/views/collections/users'
template  = require 'template/layouts/top'

module.exports = class extends Backbone.Marionette.Layout
    template: template
    regions:
      users: ".js-users"
    onRender: ->
      @users.show(
        new UsersView collection: @collection
      )
