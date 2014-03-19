'use strict'

Backbone    = require 'backbone'
Controller  = require 'myapp/controller'

class Router extends Backbone.Marionette.AppRouter
  controller: Controller
  appRoutes:
    "":       "top"
    "error":  "error"

module.exports = new Router

