( (model) ->
  'use strict'

  model.User = model.Base.extend
    urlRoot: "/users/"

    initialize: (attrs) ->
      @createStorage "model:user:#{attrs.id}"
      @name = attrs.name

).call(this, myapp.model)
