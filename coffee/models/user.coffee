( (model) ->
  'use strict'

  model.User = model.Base.extend
    urlRoot: "/api/users/"

    initialize: (attrs) ->
      @storageKey = "model:user:#{attrs.id}"
      @name = attrs.name

    say: ->
      "I am #{@name}"

).call(this, myapp.model)
