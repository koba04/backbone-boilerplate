( ->
  'use strict'

  model = @model
  util = @util

  class model.Base extends Backbone.Model
    storage: null
    sync: util.cachedSync
    initialize: (attrs = {}) ->
      if @storageType?
        idAttribute = if @idAttribute? then @idAttribute else "id"
        id = attrs[idAttribute] or ""
        @storage = new ModelStorage "model:#{@constructor.name}:#{id}", @storageType
        @on "change", =>
          @storage.set @toJSON()
        @on "destroy", =>
          @storage.remove()

  # for cache
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
