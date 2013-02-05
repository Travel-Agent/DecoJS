moquire({
	"ordnung/ajax":"Mocks/ajaxMock"
},["ordnung/qvc", "ordnung/ajax", "knockout"], function(qvc, ajaxMock, ko){
	
	describe("when creating an executable", function(){
		
		var executable,
			parameters;
		
		beforeEach(function(){
			ajaxMock.responseText = "{\"parameters\": []}";
			executable = qvc.createCommand("name");
		});
		
		it("should have isValid", function(){
			expect(executable.isValid).toBeDefined();
			expect(executable.isValid()).toBe(true);
		});
		
		it("should have hasError", function(){
			expect(executable.hasError).toBeDefined();
			expect(executable.hasError()).toBe(false);
		});
		
		it("should have isBusy", function(){
			expect(executable.isBusy).toBeDefined();
			expect(executable.isBusy()).toBe(false);
		});
		
		it("should have result", function(){
			expect(executable.result).toBeDefined();
			expect(executable.result()).toBe(null);
		});
		
		describe("when the name is missing", function(){
			it("should throw an error", function(){
				expect(function(){
					qvc.createCommand();
				}).toThrow(new Error("command is missing name\nA command must have a name!\nusage: createCommand('name', {<options>})"));
			});
		});
		
		describe("with observable parameters", function(){
		
			beforeEach(function(){
				parameters = {
					name: ko.observable()
				};

				ajaxMock.spy.reset();
				ajaxMock.responseText = "{\"parameters\": []}";
				executable = qvc.createCommand("name", {
					parameters: parameters
				});
			});
		
			it("should add validator to the parameters", function(){
				expect(parameters.name.validator).toBeDefined()
			});

			it("should request constraints from the server", function(){
				expect(ajaxMock.spy.callCount).toBe(1);
				expect(ajaxMock.spy.firstCall.args[0]).toMatch(/validation\/name$/);
			});
		});
		
	});
	
});