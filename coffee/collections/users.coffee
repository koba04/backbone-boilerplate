( ->
  'use strict'

  model = @model
  collection = @collection

  class collection.Users extends collection.Base
    url: "/users/"
    model: model.User
    storageType: "session"

).call myapp
