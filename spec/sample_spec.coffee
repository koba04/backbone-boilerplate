describe "sample", ->
  it "sample", ->
   expect(true).to.be.ok()

describe "User", ->
  it "say", ->
    user = new MyApp.Model.User
      name: "John"
    expect(user.say()).to.be("I am John")

describe "View::Sub::My", ->
  it "message", ->
    view = new MyApp.View.Sub.My
    view.show
      message: "this is test"
    expect(view.$el.find('p').text()).to.be('this is test')
