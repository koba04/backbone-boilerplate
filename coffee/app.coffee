do ->
  'use strict'

  # define namespace
  myapp = window.myapp
  myapp.model = {}
  myapp.collection = {}
  myapp.view =
    main: {}
    sub: {}
  myapp.util = {}

  # override Backbone.sync
  originalSync = Backbone.sync
  Backbone.sync = (method, model, options) ->

    # define error callback
    options.error = ->
      window.location = "#/error/"

    # call original sync
    sync = -> originalSync method, model, options

    # not save storage
    return sync() unless model.isSaveStorage

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

