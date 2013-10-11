( ->
  'use strict'

  app = @app
  model = @model
  util = @util

  model.Base = Backbone.Model.extend
    storage: null
    sync: app.sync
    setStorage: (key) -> @storage = new ModelStorage key

  # for API cache
  class ModelStorage
    constructor: (@key, storageType = "session") ->
      @storage = if storageType is "local" then util.localStorage else util.sessionStorage

    get: ->
      data = @storage.get @key
      return unless data?
      JSON.parse data

    set: (data, method) ->
      @storage.set @key, JSON.stringify(data)

    remove: -> @storage.remove @key

).call myapp
