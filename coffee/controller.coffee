'use strict'

App     = require 'myapp/app'
users   = require 'myapp/collections/users'
TopView     = require 'myapp/views/layouts/top'
ErrorView   = require 'myapp/views/layouts/error'

module.exports =
  top: ->
    users.fetch().done =>
      App.content.show new TopView
        collection: users

  error: ->
    App.content.show new ErrorView()

