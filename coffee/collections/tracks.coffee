'use strict'

Base  = require 'myapp/collections/base'
Track = require 'myapp/models/track'

class Tracks extends Base
  model: Track

module.exports = new Tracks
