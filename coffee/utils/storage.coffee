( ->
  'use strict'

  class Storage
    constructor: (@type) -> @storage = if @type is "local" then localStorage else sessionStorage

    get: (key) -> @storage.getItem key

    set: (key, data) -> @storage.setItem key, data

    remove: (key) -> @storage.removeItem key

    clear: -> @storage.clear()

  @util.sessionStorage = new Storage 'session'
  @util.localStorage = new Storage 'local'

).call myapp
