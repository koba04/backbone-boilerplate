( (util) ->
  'use strict'

  # http.get('/path/to/api', { key: 'val'}).next(data) -> console.log data
  class Http
    constructor: ->
      $.ajaxSettings.timeout = 5000
      $.ajaxSettings.xhr = ->
        xhr = new XMLHttpRequest()
        # set http header to xhr
        xhr

    get: (url, params) ->
      @_ajax 'get', url, params

    post: (url, params) ->
      @_ajax 'post', url, params

    put: (url, params) ->
      @_ajax 'put', url, params

    delete: (url, params) ->
      @_ajax 'delete', url, params

    _ajax: (method, url, params) ->
      deferred = new Deferred()
      $.ajax
        url: url
        type: method
        data: params
        dataType: 'json'

        success: (data) ->
          deferred.call(data)

        error: (xhr, type) ->
          deferred.fail xhr
      deferred

  util.Http = new Http()

).call(this, myapp.util)
