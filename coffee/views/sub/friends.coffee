( (SubView, sub) ->
  'use strict'

  sub.Friends = SubView.extend
    tmpl: SubView.JST 'sub/friends'

    show: (users) ->
      @render friends: users.toJSON()

).call(this, myapp.view.SubView,  myapp.view.sub)
