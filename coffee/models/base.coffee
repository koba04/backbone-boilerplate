( (model, util) ->
  'use strict'

  model.Base = Backbone.Model.extend
    storage: null
    sync: util.CacheSync.sync

    createStorage: (key) -> @storage = new Storage key

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
