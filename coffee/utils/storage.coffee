do ->
  'use strict'

  global = @

  class Storage
    constructor: -> @storage = sessionStorage

    get: (key) -> @storage.getItem key

    set: (key, data) -> @storage.setItem key, data

    remove: (key) -> @storage.removeItem key

    clear: -> @storage.clear()

  myapp.util.Storage = new Storage()
