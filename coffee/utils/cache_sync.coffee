( (util) ->
  'use strict'

  # 1. Override sync method on Backbone.Model or Backbone.Collection (or SubClass)
  # 2. define storageKey value. ex. "model:user:#{@id}", "collection:users"
  # 3. implement getStorage(), saveStorage(method, data), removeStorage()
  class CacheSync
    sync: (method, model, options) ->
      # define error callback
      options.error = ->
        window.location = "#/error/"

      # call original sync
      sync = (success) ->
        options.success = success if success?
        Backbone.sync method, model, options

      # not save storage
      return sync() unless model.storageKey

      successCallback = options.success

      # DELETE
      if method is "delete"
        return sync (data) ->
          model.removeStorage()
          successCallback data

      # GET and hit cache
      if method is "read"
        cache = model.getStorage()
        # success callback
        return successCallback cache if cache?

      # set saveStorage in successCallback
      sync (data) ->
        model.saveStorage method, data
        successCallback data

  util.CacheSync = new CacheSync()

).call(this, myapp.util)