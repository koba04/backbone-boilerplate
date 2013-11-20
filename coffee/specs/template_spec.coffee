describe "Template", ->

  template = new myapp.Template()

  describe "helper", ->
    it "upperCase", ->
      expect(template.helper.upperCase("this is text")).to.be "THIS IS TEXT"
