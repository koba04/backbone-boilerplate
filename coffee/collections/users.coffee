do ->
  'use strict'

  MyApp.Collection.Users = Backbone.Collection.extend
    url:  '/api/users/'
    model:    MyApp.Model.User
