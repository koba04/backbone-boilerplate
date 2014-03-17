'use strict'

Base = require 'myapp/models/base'

module.exports = class extends Base
  urlRoot: "/users/"
  initialize: (attrs) ->
    super
    @name = attrs.name

