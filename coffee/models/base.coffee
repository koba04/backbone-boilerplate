( ->
  'use strict'

  a = @app
  m = @model
  Storage = @util.Storage

  m.Base = Backbone.Model.extend
    storage: null
    sync: a.sync

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
