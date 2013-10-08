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

    # POST or PUT or DELETE
    if method isnt "read"
      model.removeStorage()
      sync()

    # GET request

    # not save storage target
    return sync() unless model.isSaveStorage?

    cache = model.getStorage()
    # success callback
    return options.success cache if cache?

    # API request and save storage
    successCallback = options.success
    options.success = (data) ->
      model.saveStorage data
      successCallback data
    sync()

