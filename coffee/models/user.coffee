( ->
  'use strict'

  m = @model

  m.User = m.Base.extend
    urlRoot: "/users/"

    initialize: (attrs) ->
      @createStorage "model:user:#{attrs.id}"
      @name = attrs.name

).call myapp
