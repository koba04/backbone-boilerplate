( (model, collection) ->
  'use strict'

  collection.Users = collection.Base.extend
    url:  "/users/"
    model: model.User
    initialize: (attrs) ->
      @createStorage "collection:users", @model 

).call(this, myapp.model, myapp.collection)
