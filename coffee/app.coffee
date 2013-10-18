( ->
  'use strict'

  myapp = @
  Storage = @util.Storage

  class App
    constructor: ->
      @template = new myapp.Template()
      @router = new myapp.Router()

    setupAjax: ->
      # setup XHR
      $.ajaxSettings.timeout = 5000
      $.ajaxSettings.cache = false
      $.ajaxSettings.xhr = ->
        xhr = new XMLHttpRequest
        # set http header to xhr
        xhr

    start: ->
      @setupAjax()
      @router.start()

    # 1. Override sync method on Backbone.Model or Backbone.Collection (or subclass)
    # 2. define storage to model or collection
    # 3. storage need implement get save remove method
    sync: (method, model, options) ->

      # throw Error if called like app.sync()
      throw new Error "sync method is for override model or collection's sync()" if @ instanceof App

      # define error callback
      options.error = -> myapp.app.router.navigate "#/error/", true

      # call original sync
      sync = (success) ->
        options.success = success if success?
        Backbone.sync method, model, options

      # not save storage
      return sync() unless model.storage?

      successCallback = options.success

      # DELETE
      if method is "delete"
        return sync (data) ->
          model.storage.remove()
          successCallback data

      # GET and hit cache
      if method is "read"
        cache = model.storage.get()
        # success callback
        return successCallback cache if cache?

      # set saveStorage in successCallback
      sync (data) ->
        # save model and storage
        model.set data
        model.storage.set data, method
        successCallback data

  myapp.app = new App()

).call myapp
