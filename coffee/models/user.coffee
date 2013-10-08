do ->
  'use strict'

  MyApp.Model.User = Backbone.Model.extend
    say: ->
      "I am #{@get("name")}"
