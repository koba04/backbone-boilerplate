describe "util.Storage", ->
  data = JSON.stringify id: 1, name: "jim", age: 20

  for storageType in ['sessionStorage', 'localStorage']

    describe storageType, ->

      storage = myapp.util[storageType]

      after ->
        storage.clear()

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

  it "sessionStorage and localStorage are independent storage", ->
    myapp.util.sessionStorage.set "hogehoge", "foofoo"
    expect(myapp.util.sessionStorage.get("hogehoge")).to.be "foofoo"
    expect(myapp.util.localStorage.get("hogehoge")).to.be null
