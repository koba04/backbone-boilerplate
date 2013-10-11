( ->
  'use strict'

  model = @model
  collection = @collection

  collection.Users = collection.Base.extend
    url:  "/users/"
    model: model.User
    initialize: (attrs) ->
      @setStorage "collection:users", @model

).call myapp
