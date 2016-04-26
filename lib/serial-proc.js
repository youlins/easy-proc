
function SerialProc(name) {
	var steps = [];

	this.then = function(step) {
		steps.push(step);
		return this;
	}

	this.go = function(ctx, callback) {
		var i = 0;
		console.log("process serial-step procdure : " + name);

		(function nextStep() {
			if(typeof steps[i] == "function") {
				steps[i](ctx, function(result){
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