( ->
  'use strict'

  class Storage
    constructor: (@storage) ->
    get: (key) -> @storage.getItem key

    set: (key, data) -> @storage.setItem key, data

    remove: (key) -> @storage.removeItem key

    clear: -> @storage.clear()

  @util.sessionStorage = new Storage sessionStorage
  @util.localStorage = new Storage localStorage

).call myapp
