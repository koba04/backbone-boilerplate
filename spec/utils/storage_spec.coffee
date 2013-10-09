describe "util.Storage", ->
  storage = myapp.util.Storage
  data = JSON.stringify id: 1, name: "jim", age: 20

  it "set and get data", ->
    storage.set "user_data", data
    expect(storage.get("user_data")).to.be data

  it "remove data", ->
    storage.set "user_data", data
    storage.remove "user_data"
    expect(storage.get("user_data")).to.not.be.ok()

  it "clear data", ->
    storage.set "user_data1", data
    storage.set "user_data2", data
    storage.clear()
    expect(storage.get("user_data1")).to.not.be.ok()
    expect(storage.get("user_data2")).to.not.be.ok()
