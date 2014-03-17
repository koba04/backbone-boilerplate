'use strict'

UserView = require 'myapp/views/items/user_row'

module.exports = class extends Backbone.Marionette.CollectionView
  itemView: UserView

