( ->
  'use strict'

  model = @model
  collection = @collection

  collection.Users = collection.Base.extend
    url:  "/users/"
    model: model.User
    initialize: (attrs) ->
      @createStorage "collection:users", @model

).call myapp
