( (model, collection) ->
  'use strict'

  collection.Users = collection.Base.extend
    isSaveStorage: true
    url:  '/api/users/'
    model: model.User
    storageKey: "collection:users"

).call(this, myapp.model, myapp.collection)
