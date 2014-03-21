'use strict'

Backbone  = require 'backbone'
TrackView = require 'myapp/views/items/track'

module.exports = class extends Backbone.Marionette.CollectionView
  tagName: "ul"
  className: "list-group"
  itemView: TrackView

