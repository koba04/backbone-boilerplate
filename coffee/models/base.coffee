( (model, util) ->
  'use strict'

  model.Base = Backbone.Model.extend
    storage: null
    sync: myapp.app.sync

    createStorage: (key) -> @storage = new Storage key

  # for API cache
  class Storage
    constructor: (@key) ->

    get: ->
      data = util.Storage.get @key
      return unless data?
      JSON.parse data

    set: (data, method) ->
      util.Storage.set @key, JSON.stringify(data)

    remove: -> util.Storage.remove @key

).call(this, myapp.model, myapp.util)
