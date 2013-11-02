( ->
  'use strict'

  model = @model
  collection = @collection
  util = @util

  collection.Base = Backbone.Collection.extend
    storage: null
    sync: util.cachedSync
    model: model.Base
    initialize: ->
      if @storageType?
        @storage = new CollectionStorage "collection:#{@constructor.name}", @model, @storageType
        setStorage = =>
          @storage.set @toJSON()
        @on
          "add": setStorage
          "remove": setStorage
          "reset": setStorage
          "destroy": =>
            @storage.remove()

  # for cache
  class CollectionStorage
    constructor: (@key, @model, storageType) ->
      switch storageType
        when "session" then @storage = util.sessionStorage
        when "local"   then @storage = util.localStorage
        else throw new Error "storageType is allowed 'session' or 'local'"

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
