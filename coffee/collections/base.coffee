( ->
  'use strict'

  app = @app
  model = @model
  collection = @collection
  util = @util

  collection.Base = Backbone.Collection.extend
    storage: null
    sync: app.sync
    model: model.Base
    setStorage: (key) -> @storage = new CollectionStorage key, @model

  # for API cache
  class CollectionStorage
    constructor: (@key, @model, storageType = "session") ->
      @storage = if storageType is "local" then util.localStorage else util.sessionStorage

    get: ->
      ids = @storage.get @key
      return unless ids?

      datas = []
      ids = JSON.parse ids
      idAttribute = @_getModelIdAttribute()
      opt = {}
      for id in ids
        opt[idAttribute] = id
        data = new @model(opt).storage.get()
        return unless data?
        datas.push data
      datas

    set: (datas, method) ->
      ids = []
      idAttribute = @_getModelIdAttribute()
      opt = {}
      for data in datas
        # set model's id. (default is "id")
        id = data[idAttribute]
        ids.push id
        # save to model
        opt[idAttribute] = id
        new @model(opt).storage.set data, method
      # save to collection
      @storage.set @key, JSON.stringify(ids)

    remove: ->
      ids = @storage.get @key
      @storage.remove @key
      for id in ids
        # remove from model
        new @model(id: id).storage.remove()

    _getModelIdAttribute: ->
      if @model::idAttribute? then @model::idAttribute else "id"



).call myapp
