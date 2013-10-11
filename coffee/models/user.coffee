( ->
  'use strict'

  model = @model

  model.User = model.Base.extend
    urlRoot: "/users/"

    initialize: (attrs) ->
      @createStorage "model:user:#{attrs.id}"
      @name = attrs.name

).call myapp
