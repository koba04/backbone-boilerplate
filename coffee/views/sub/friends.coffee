( (SubView, sub) ->
  'use strict'

  sub.Friends = SubView.extend
    tmpl: SubView.JST 'sub/friends'

    show: (users) ->
      # XXX
      Handlebars.registerPartial 'user', SubView.JST 'particle/user'
      @render friends: users.toJSON()

).call(this, myapp.view.SubView,  myapp.view.sub)
