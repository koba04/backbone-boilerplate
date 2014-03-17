'use strict'

UsersView = require 'myapp/views/collections/users'

module.exports = class extends Backbone.Marionette.Layout
    template: JST['layouts/top']
    regions:
      users: ".js-users"
    onRender: ->
      @users.show(
        new UsersView collection: @collection
      )
