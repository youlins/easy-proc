var EasyProc = require("../");
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
    	err?next(false):next(true);
	});
}

function readfile2(ctx, next) {
	fs.readFile('file2.txt.error','utf-8',function(err,data){
		ctx.file2 = err;
		console.log("reading file2.txt.error");
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
		console.log("reading  file4.txt");
    	err?next(false):next(true);  
	});
}

var ep = new EasyProc("easy-proc-demo")
.then(readfile1)
.then(readfile2, readfile3)
.then(readfile4);

var ctx = {};
ep.go(ctx, onFinished);

//readfile2 fail, then readfile3 will run continue, but readfile4 will finish.
