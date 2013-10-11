( ->
  'use strict'

  app = @app
  model = @model
  collection = @collection
  Storage = @util.Storage

  collection.Base = Backbone.Collection.extend
    storage: null
    sync: app.sync
    model: model.Base
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
        data = new @model(id: id).storage.get()
        return unless data?
        datas.push data
      datas

    set: (datas, method) ->
      ids = []
      for data in datas
        ids.push data.id
        # save to model
        new @model(id: data.id).storage.set data, method
      # save to collection
      Storage.set @key, JSON.stringify(ids)

    remove: ->
      ids = Storage.get @key
      Storage.remove @key
      for id in ids
        # remove from model
        new @model(id: id).storage.remove()

).call myapp
