describe "Template", ->

  template = new myapp.Template()

  describe "get", ->
    it "can get JST template", ->
      expect(template.get("main/default")).to.be myapp.JST["main/default"]

  describe "helper", ->
    it "upperCase", ->
      expect(template.helper.upperCase("this is text")).to.be "THIS IS TEXT"
