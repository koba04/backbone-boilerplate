( (model, collection) ->
  'use strict'

  class collection.Users extends collection.Base
    isSaveStorage: true
    url:  '/api/users/'
    model: model.User
    storageKey: "collection:users"

).call(this, myapp.model, myapp.collection)
