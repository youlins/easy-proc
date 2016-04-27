var SerialProc = require("./serial-proc");
var ParallelProc = require("./parallel-proc");

function EasyProc (name) {
	var serial = new SerialProc();

	this.then = function() {

		if(arguments.length == 1) {
			serial.then(arguments[0]);
		} else {
			var parallel = new ParallelProc().then(arguments);
			serial.then(function(ctx, next){
				parallel.go(ctx, function(result, ctx, err) {
					next(result, err);
				})
			})
		}

		return this;
	}

	this.go = function(ctx, callback) {
		name&&console.log("process easy-proc procdure : " + name);
		serial.go(ctx, callback);
	}
}

EasyProc.Serial = SerialProc;
EasyProc.Parallel = ParallelProc;

module.exports = EasyProc;
