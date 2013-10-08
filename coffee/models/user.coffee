do ->
  'use strict'

  MyApp.Model.User = Backbone.Model.extend
    urlRoot: "/api/users/"
    say: ->
      "I am #{@get("name")}"
