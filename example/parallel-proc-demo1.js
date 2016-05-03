var ParallelProc = require("../").Parallel;
var fs = require("fs");

function onFinished(result, ctx) {
	console.log("result : " + result);
	console.log("context : ");
	console.log(ctx);
}

function readfile1(ctx, next) {
	fs.readFile('file1.txt','utf-8',function(err,data){
		ctx.file1 = data;
		console.log("reading file1.txt");
		next(true);
    	err?next(false):next(true);
	});
}

function readfile2(ctx, next) {
	fs.readFile('file2.txt','utf-8',function(err,data){
		ctx.file2 = data;
		console.log("reading file2.txt");
    	err?next(false):next(true);  
	});
}

function readfile3(ctx, next) {
	fs.readFile('file3.txt','utf-8',function(err,data){
		ctx.file3 = data;
		console.log("reading file3.txt");
    	err?next(false):next(true);  
	});
}

function readfile4(ctx, next) {
	fs.readFile('file4.txt','utf-8',function(err,data){
		ctx.file4 = data;
		console.log("reading file4.txt");
    	err?next(false):next(true);  
	});
}

var pp = new ParallelProc("pp").then(readfile1, readfile2, readfile3, readfile4);

var ctx1 = {};
pp.go(ctx1, onFinished);

//ctx2 isn't affected by ctx1
var ctx2 = {};
pp.go(ctx2, onFinished);