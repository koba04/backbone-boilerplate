( (SubView, sub) ->
  'use strict'

  sub.Top = SubView.extend
    tmpl: SubView.JST 'sub/top'


).call(this, myapp.view.SubView,  myapp.view.sub)
