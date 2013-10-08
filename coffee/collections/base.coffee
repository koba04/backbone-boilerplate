( (model, collection, util) ->
  'use strict'

  collection.Base = Backbone.Collection.extend
    storageKey: null
    sync: util.CacheSync.sync
    model: model.Base

    getStorage: ->
      ids = util.Storage.get @storageKey
      return unless ids?

      datas = []
      for id in ids
        model = new @model id: id
        data = util.Storage.get model.storageKey
        return unless data?
        datas.push data
      datas

    saveStorage: (method, datas) ->
      ids = []
      for data in datas
        ids.push data.id
        model = new @model id: data.id
        # save to model
        util.Storage.set model.storageKey, JSON.stringify(data)
      # save to collection
      util.Storage.set @storageKey, JSON.stringify(ids)

    removeStorage: ->
      ids = util.Storage.get @storageKey
      util.Storage.remove @storageKey
      for id in ids
        model = new @model id: id
        # remove from model
        util.Storage.remove model.storageKey

).call(this, myapp.model, myapp.collection, myapp.util)
