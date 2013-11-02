( ->
  'use strict'

  class Template
    constructor: ->
      # registerHelper
      for name, fn of @helper
        Handlebars.registerHelper name, fn
      # registerParticle
      for particle in @particles
        Handlebars.registerPartial particle, JST["particle/#{particle}"]

    helper:
      upperCase: (str) -> str.toUpperCase()

    particles: [
      'user'
    ]

  @Template = Template

).call myapp
