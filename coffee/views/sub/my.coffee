( (SubView, sub) ->
  'use strict'

  sub.My = SubView.extend
    tmpl: SubView.JST 'sub/my'

    show: (user) ->
      @render user: user.toJSON()
).call(this, myapp.view.SubView,  myapp.view.sub)
