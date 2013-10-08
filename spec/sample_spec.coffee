describe "sample", ->
  it "sample", ->
   expect(true).to.be.ok()

describe "model.User", ->
  it "say", ->
    user = new myapp.model.User name: "John"
    expect(user.say()).to.be("I am John")

describe "view.sub.My", ->
  it "message", ->
    view = new myapp.view.sub.My
    view.show
      message: "this is test"
    expect(view.$el.find('p').text()).to.be('this is test')
