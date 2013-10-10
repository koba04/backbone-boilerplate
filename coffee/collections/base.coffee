( (model, collection, util) ->
  'use strict'

  collection.Base = Backbone.Collection.extend
    storage: null
    sync: util.CacheSync.sync
    model: model.Base
    createStorage: (key) -> @storage = new Storage key, @model

  class Storage
    constructor: (@key, @model) ->

    get: ->
      ids = util.Storage.get @key
      return unless ids?
      ids = JSON.parse ids

      datas = []
      console.log @model
      for id in ids
        model = new @model id: id
        data = model.storage.get()
        return unless data?
        datas.push data
      datas

    set: (datas, method) ->
      ids = []
      for data in datas
        ids.push data.id
        # save to model
        model = new @model id: data.id
        model.storage.set data, method
      # save to collection
      util.Storage.set @key, JSON.stringify(ids)

    remove: ->
      ids = util.Storage.get @key
      util.Storage.remove @key
      for id in ids
        # remove from model
        model = new @model id: id
        model.storage.remove()

).call(this, myapp.model, myapp.collection, myapp.util)
