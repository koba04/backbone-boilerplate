describe "Model.User", ->
  expect  = require 'expect.js'
  User    = require 'myapp/models/user'
  Base    = require 'myapp/models/base'

  user = null
  beforeEach ->
    user = new User name: "jim"

  it "extends Base", ->
    expect(user).to.be.a Base

  it "urlRoot is /users/", ->
    expect(user.urlRoot).to.be "/users/"

  it "name property set by initialize", ->
    expect(user.get("name")).to.be "jim"

