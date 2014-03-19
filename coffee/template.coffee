'use strict'

module.exports = class
  constructor: ->
#    # registerHelper
#    for name, fn of @helper
#      Handlebars.registerHelper name, fn
#    # registerParticle
#    for particle in @particles
#      Handlebars.registerPartial particle, require("template/particle/#{particle}")

  helper:
    equal: (a, b, options) ->
      if a is b
        options.fn @
      else
        options.inverse @

  particles: [
  ]

