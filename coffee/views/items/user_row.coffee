'use strict'

Backbone  = require 'backbone'
template  = require 'template/items/user_row'

module.exports = class extends Backbone.Marionette.ItemView
  template: template

