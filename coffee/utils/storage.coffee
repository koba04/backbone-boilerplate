( ->
  'use strict'

  storage = sessionStorage
  @util.Storage =
    get: (key) -> storage.getItem key

    set: (key, data) -> storage.setItem key, data

    remove: (key) -> storage.removeItem key

    clear: -> storage.clear()

).call myapp
