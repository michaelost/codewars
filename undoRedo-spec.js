function undoRedo(object) {
	var stack = [], undo = [], redo = [];
	return {
		set: function(key, value) {
			
			var state = {
				field : key,
				prevValue : object[key],
				nextValue : value
			};

			undo.push(state);

			Object.defineProperty(object,key,{
				enumerable: true,
				writable: true,
				configurable: true,
				value: value
			});
			redo = [];
		},
		get: function(key) {
			return object[key];

		},
		del: function(key) {
			var state = {
				field : key,
				prevValue : object[key],
				nextValue : undefined
			};
			undo.push(state);
			delete object[key];
			redo = [];
		},
		undo: function() {
			if (undo.length == 0) throw "there is nothing to undo";
			var state = undo.pop();
			object[state.field] = state.prevValue;
			redo.push(state);

		},
		redo: function() {
			if (redo.length == 0) throw "there is nothing to redo";
			var state = redo.pop();
			object[state.field] = state.nextValue;			
			undo.push(state);
			if(state.nextValue == undefined) delete object[state.field];
		}
	};
}




var object = {

},
opa = new undoRedo(object);
opa.set('x',10);
opa.set('y',10);


describe("object set",function () {
	
	it("should check set", function () {
		expect(opa.get('x')).toBe(10);
		expect(opa.get('y')).toBe(10);
	});

	it("should check delete", function () {
		opa.del('x');
		expect(opa.get('x')).toBe(undefined);
		opa.del('y');
		expect(opa.get('y')).toBe(undefined);
		
	});

	it("shoould check undo", function () {

	});



});