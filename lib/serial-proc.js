
function SerialProc(name) {
	var steps = [];

	this.then = function(step) {
		steps.push(step);
		return this;
	}

	this.go = function(ctx, callback) {
		var i = 0;

		name&&console.log("process serial-proc procdure : " + name);

		(function nextStep() {
			if(typeof steps[i] == "function") {
				var done = false;
				steps[i](ctx, function(result){
					if(done) return;
					done = true;

					i++;
					result? nextStep() : callback(false, ctx);
				});
			} else {
				callback(true, ctx);
			}
		})();
	}
}

module.exports = SerialProc;
