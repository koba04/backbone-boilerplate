( (model, util) ->
  'use strict'

  model.Base = Backbone.Model.extend
    storageKey: null
    sync: util.CacheSync.sync

    getStorage: ->
      data = util.Storage.get @storageKey
      return unless data?
      JSON.parse data

    saveStorage: (method, data) -> util.Storage.set @storageKey, JSON.stringify(data)

    removeStorage: -> util.Storage.remove @storageKey

).call(this, myapp.model, myapp.util)
