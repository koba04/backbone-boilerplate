'use strict'

Backbone  = require 'backbone'
template  = require 'template/layouts/error'

module.exports = class extends Backbone.Marionette.Layout
    template: template

