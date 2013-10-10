( (SubView, sub, app) ->
  'use strict'

  sub.Friends = SubView.extend
    tmpl: app.template.get 'sub/friends'

    show: (users) ->
      @render friends: users.toJSON()

).call(this, myapp.view.SubView,  myapp.view.sub, myapp.app)
