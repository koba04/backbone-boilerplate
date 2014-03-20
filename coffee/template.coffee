'use strict'

Handlebars = require('handlebars')

class Template
  constructor: ->
    # registerHelper
    for name, fn of @helper
      Handlebars.registerHelper name, fn
    # registerPartial
    for partial in @partials
      Handlebars.registerPartial partial, require("template/partials/#{partial}")

  helper:
    equal: (a, b, options) ->
      if a is b
        options.fn @
      else
        options.inverse @

  partials: [
  ]

module.exports = new Template()
