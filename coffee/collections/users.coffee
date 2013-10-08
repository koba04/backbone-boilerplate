( (model, collection) ->
  'use strict'

  collection.Users = Backbone.Collection.extend
    url:  '/api/users/'
    model: model.User


).call(this, myapp.model, myapp.collection)
