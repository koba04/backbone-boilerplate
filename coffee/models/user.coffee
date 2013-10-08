( (model) ->
  'use strict'

  class model.User extends model.Base
    isSaveStorage: true
    urlRoot: "/api/users/"

    initialize: (attrs) ->
      @storageKey = "model:user:#{attrs.id}"

).call(this, myapp.model)
