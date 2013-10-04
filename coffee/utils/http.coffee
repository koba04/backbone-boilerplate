do ->
  'use strict'

  class Http
    constructor: ->
      $.ajaxSettings.timeout = 5000
      $.ajaxSettings.xhr = ->
        xhr = new XMLHttpRequest()
        # set http header to xhr
        xhr

    get: (url, params, success, fail) ->
      @_ajax 'get', url, params, success, fail

    post: (url, params, success, fail) ->
      @_ajax 'post', url, params, success, fail

    put: (url, params, success, fail) ->
      @_ajax 'put', url, params, success, fail

    delete: (url, params, suceess, fail) ->
      @_ajax 'delete', url, params, success, fail

    _ajax: (method, url, params, success, fail) ->
      $.ajax
        url: url
        type: method
        data: params
        dataType: 'json'

        success: (data) ->
          success(data)

        error: (xhr, type) ->
          if fail?
            fail(xhr, type)
          else
            # redirect error


  MyApp.Util.Http = new Http()

