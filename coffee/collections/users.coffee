( ->
  'use strict'

  m = @model
  c = @collection

  c.Users = c.Base.extend
    url:  "/users/"
    model: m.User
    initialize: (attrs) ->
      @createStorage "collection:users", @model

).call myapp
