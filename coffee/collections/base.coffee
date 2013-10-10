( ->
  'use strict'

  a = @app
  m = @model
  c = @collection
  v = @view
  Storage = @util.Storage

  c.Base = Backbone.Collection.extend
    storage: null
    sync: a.sync
    model: m.Base
    createStorage: (key) -> @storage = new CollectionStorage key, @model

  # for API cache
  class CollectionStorage
    constructor: (@key, @model) ->

    get: ->
      ids = Storage.get @key
      return unless ids?

      datas = []
      ids = JSON.parse ids
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
      Storage.set @key, JSON.stringify(ids)

    remove: ->
      ids = Storage.get @key
      Storage.remove @key
      for id in ids
        # remove from model
        model = new @model id: id
        model.storage.remove()

).call myapp
