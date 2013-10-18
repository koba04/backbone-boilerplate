( ->
  'use strict'

  app = @app
  model = @model
  util = @util

  model.Base = Backbone.Model.extend
    storage: null
    sync: app.sync
    initialize: (attrs) ->
      id = if @idAttribute? then @idAttribute else 'id'
      @storage = new ModelStorage "model:#{@constructor.name}:#{attrs[id]}", @storageType if @storageType?

  # for API cache
  class ModelStorage
    constructor: (@key, storageType) ->
      switch storageType
        when "session" then @storage = util.sessionStorage
        when "local"   then @storage = util.localStorage
        else throw new Error "storageType is allowed 'session' or 'local'"

    get: ->
      data = @storage.get @key
      return unless data?
      JSON.parse data

    set: (data, method) ->
      @storage.set @key, JSON.stringify(data)

    remove: -> @storage.remove @key

).call myapp
