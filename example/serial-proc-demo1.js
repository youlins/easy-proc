var SerialProc = require("../").SerialProc;

function func1(ctx, next) {
	ctx.func1 = true;
	next(true);
}

function func2(ctx, next) {
	ctx.func2 = true;
	next(true);
}

function func3(ctx, next) {
	ctx.func3 = false;
	next(false);
}

function onFinished(result, ctx) {
	console.log("result : " + result);
	console.log("context : ");
	console.log(ctx);
}

var ctx1 = {};
var sp1 = new SerialProc("ss")
.then(func1)
.then(func2);

var ctx2 = {};
var sp2 = new SerialProc("ss2")
.then(func1)
.then(func2)
.then(func3);

sp2.go(ctx1, onFinished);
sp2.go(ctx2, onFinished);
