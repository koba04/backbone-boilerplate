( (util) ->
  'use strict'

  class CacheSync
    sync: (method, model, options) ->
      # define error callback
      options.error = ->
        window.location = "#/error/"

      # call original sync
      sync = -> Backbone.sync method, model, options

      # not save storage
      return sync() unless model.storageKey

      successCallback = options.success

      # DELETE
      if method is "delete"
        options.success = (data) ->
          model.removeStorage()
          successCallback data
        return sync()

      # GET and hit cache
      if method is "read"
        cache = model.getStorage()
        # success callback
        return successCallback cache if cache?

      # set saveStorage in successCallback
      options.success = (data) ->
        model.saveStorage method, data
        successCallback data
      sync()

  util.CacheSync = new CacheSync()

).call(this, myapp.util)
