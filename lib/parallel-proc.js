

function ParallelProc(name) {
	var steps = [];

	this.then = function(func) {
		var funcs = typeof arguments[0] == "object" ? arguments[0] : arguments;
		
		for(var i in funcs) {
			(typeof funcs[i] == "function")&&steps.push(funcs[i]);
		}

		return this;
	}

	this.go = function(ctx, callback) {
		var i = steps.length;
		var pass = true;
		var errors = [];

		name&&console.log("process parallel-proc procdure : " + name);

		if(!i) {
			return callback(pass, ctx, errors);
		}

		for(var j in steps) {
			var done = false;

			steps[j](ctx, function(result, err){
				if(done) return;
				done = true;

				!result&&(pass=false, errors.push(err));
				--i<=0&&callback(pass, ctx, errors);
			});
		}
	}
}

module.exports = ParallelProc;
