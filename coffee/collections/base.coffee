'use strict'

Model = require 'myapp/models/base'

module.exports =  class extends Backbone.Collection
  model: Model
