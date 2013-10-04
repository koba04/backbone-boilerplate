do ->
  'use strict'

  MyApp.Collection.Users = Backbone.Collection.extend
    urlRoot:  '/api/users/'
    model:    MyApp.Model.User
