describe "Collection.Users", ->

  users   = require 'myapp/collections/users'
  Base    = require 'myapp/collections/base'
  User    = require 'myapp/models/user'

  beforeEach ->
    users = new users.constructor

  it "extends Collection.Base", ->
    expect(users).to.be.a Base

  it "url is /users/", ->
    expect(users.url).to.be "/users/"

  it "model is Model.User", ->
    expect(users.model).to.be User
