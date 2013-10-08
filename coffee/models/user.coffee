( (Backbone, model) ->
  'use strict'

  model.User = Backbone.Model.extend
    urlRoot: "/api/users/"
    say: ->
      "I am #{@get("name")}"

).call(this, myapp.Backbone, myapp.model)
