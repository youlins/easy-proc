var SerialProc = require("../").SerialProc;
var fs = require("fs");

function onFinished(result, ctx) {
	console.log("result : " + result);
	console.log("context : ");
	console.log(ctx);
}

function readfile1(ctx, next) {
	fs.readFile('file1.txt','utf-8',function(err,data){
		ctx.file1 = data;
    	err?next(false):next(true);  
	});
}

function readfile2(ctx, next) {
	fs.readFile('file2.txt','utf-8',function(err,data){
		ctx.file2 = data;
    	err?next(false):next(true);  
	});
}

var sp = new SerialProc("ss")
.then(readfile1)
.then(readfile2);

var ctx1 = {};
sp.go(ctx1, onFinished);

//ctx2 isn't affected by ctx1
var ctx2 = {};
sp.go(ctx2, onFinished);