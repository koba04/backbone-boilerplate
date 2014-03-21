'use strict'

Base = require 'myapp/models/base'

module.exports = class extends Base
  idAttribute: "mbid"
  toJSON: ->
    data = super
    data.rank = @get("@attr")?.rank
    data

