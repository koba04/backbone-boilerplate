( ->
  'use strict'

  @Router = Backbone.Marionette.AppRouter.extend
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
