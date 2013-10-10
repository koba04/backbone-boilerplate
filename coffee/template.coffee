do ->
  'use strict'

  class myapp.Template
    constructor: ->
      # registerHelper
      for name, fn of @helper
        Handlebars.registerHelper name, fn
      # registerParticle
      for particle in @particles
        Handlebars.registerPartial particle, myapp.JST["particle/#{particle}"]

    get: (name) ->
      myapp.JST[name]

    helper:
      upperCase: (str) -> str.toUpperCase()

    particles: [
      'user'
    ]

