'use strict'

Base = require 'myapp/collections/base'
User = require 'myapp/models/user'

class Users extends Base
  url: "/users/"
  model: User

module.exports = new Users
