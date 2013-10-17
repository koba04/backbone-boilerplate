( ->
  'use strict'

  model = @model

  class model.User extends model.Base
    urlRoot: "/users/"
    storageType: "session"
    initialize: (attrs) ->
      super
      @name = attrs.name

).call myapp
