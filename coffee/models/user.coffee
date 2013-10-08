( (model) ->
  'use strict'

  model.User = Backbone.Model.extend
    isSaveStorage: true
    urlRoot: "/api/users/"

    initialize: (attrs) ->
      @storageKey = "model:user:#{attrs.id}"

    saveStorage: (data) ->
      sessionStorage.setItem @storageKey, JSON.stringify(data)

    getStorage: ->
      JSON.parse sessionStorage.getItem(@storageKey)

    removeStorage: ->
      sessionStorage.removeItem @storageKey

    say: ->
      "I am #{@get("name")}"

).call(this, myapp.model)
