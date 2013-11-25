( ->
  'use strict'

  class @Router extends Backbone.Marionette.AppRouter
    controller: myapp.Controller
    appRoutes:
      "":           "top"
      "error/":     "error"
      "my/":        "my"
      "friends/":   "friends"

    # 指定のページに遷移する
    assign: (path) ->
      Backbone.history.navigate "##{path}", { replace: false }
    # 指定のページに遷移する(location replace)
    replace: (path) ->
      Backbone.history.navigate "##{path}", { replace: true }

).call myapp
