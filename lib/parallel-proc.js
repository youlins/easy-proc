

function ParallelProc(name) {
	var steps = [];

	this.then = function() {
		for(var i in arguments) {
			(typeof arguments[i] == "function")&&steps.push(arguments[i]);
		}
		return this;
	}

	this.go = function(ctx, callback) {
		var i = steps.length;
		var pass = true;
		var errors = [];

		if(!i) {
			return callback(pass, ctx, errors);
		}

		for(var j in steps) {
			steps[j](ctx, function(result, err){
				!result&&(pass=false, errors.push(err));
				!--i&&callback(pass, ctx, errors);
			});
		}
	}
}

module.exports = ParallelProc;