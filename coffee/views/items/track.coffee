'use strict'

Backbone  = require 'backbone'
template  = require 'template/items/track'

module.exports = class extends Backbone.Marionette.ItemView
  tagName: "li"
  className: "list-group-item"
  template: template

