( (Backbone, model, collection) ->
  'use strict'

  collection.Users = Backbone.Collection.extend
    url:  '/api/users/'
    model: model.User


).call(this, myapp.Backbone, myapp.model, myapp.collection)
