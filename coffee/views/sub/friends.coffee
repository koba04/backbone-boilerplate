do ->
  'use strict'

  MyApp.View.Sub.Friends = MyApp.View.SubView.extend
    tmpl: MyApp.JST['sub/friends']

    show: (users) ->
      console.log users
      @render
        friends: users

