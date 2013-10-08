( (SubView, sub) ->
  'use strict'

  sub.Friends = SubView.extend
    tmpl: SubView.JST 'sub/friends'

    show: (users) ->
      @render
        friends: users

).call(this, myapp.view.SubView,  myapp.view.sub)
