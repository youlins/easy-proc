var ParallelProc = require("../").ParallelProc;
var fs = require("fs");

function onFinished(result, ctx) {
	console.log("result : " + result);
	console.log("context : ");
	console.log(ctx);
}

function readfile1(ctx, next) {
	fs.readFile('file1.txt','utf-8',function(err,data){
		ctx.file1 = data;
		console.log("file1.txt");
    	err?next(false):next(true);
	});
}

function readfile2(ctx, next) {
	fs.readFile('file2.txt','utf-8',function(err,data){
		ctx.file2 = data;
		console.log("file2.txt");
    	err?next(false):next(true);  
	});
}

var pp = new ParallelProc("pp").then(readfile1, readfile2);

var ctx1 = {};
pp.go(ctx1, onFinished);

//ctx2 isn't affected by ctx1
var ctx2 = {};
pp.go(ctx2, onFinished);