( ->
  'use strict'

  app = @app
  model = @model
  Storage = @util.Storage

  model.Base = Backbone.Model.extend
    storage: null
    sync: app.sync

    createStorage: (key) -> @storage = new ModelStorage key

  # for API cache
  class ModelStorage
    constructor: (@key) ->

    get: ->
      data = Storage.get @key
      return unless data?
      JSON.parse data

    set: (data, method) ->
      Storage.set @key, JSON.stringify(data)

    remove: -> Storage.remove @key

).call myapp
