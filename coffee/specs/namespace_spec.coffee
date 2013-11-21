describe "namespace", ->

  it "myapp is defined", ->
    expect(myapp).to.be.ok()

  it "myapp.model is defined", ->
    expect(myapp.model).to.be.ok()

  it "myapp.collection is defined", ->
    expect(myapp.collection).to.be.ok()

  it "myapp.view is defined", ->
    expect(myapp.view).to.be.ok()

  it "myapp.view.item is defined", ->
    expect(myapp.view.item).to.be.ok()

  it "myapp.view.collection is defined", ->
    expect(myapp.view.collection).to.be.ok()

  it "myapp.view.composite is defined", ->
    expect(myapp.view.composite).to.be.ok()

  it "myapp.view.layout is defined", ->
    expect(myapp.view.layout).to.be.ok()

  it "myapp.util is defined", ->
    expect(myapp.util).to.be.ok()

