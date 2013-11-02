( ->
  'use strict'

  # If you get model(collection) data from storage, not called Backbone.sync. (called success callback)
  # 1. Override sync of Backbone.Model and Backbone.Collection by this.
  # 2. Define storage to model or collection
  # 3. Bind storage cache to "change", "destroy", "add".... events.
  @util.cachedSync = (method, model, options) ->

    # GET and hit cache
    if method is "read" and model.storage?
      data = model.storage.get()
      return options.success data if data?

    Backbone.sync method, model, options

).call myapp
