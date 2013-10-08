describe "sample", ->
  it "sample", ->
   expect(true).to.be.ok()

describe "User", ->
  it "say", ->
    user = new MyApp.Model.User
      name: "John"
    expect(user.say()).to.be("I am John")
