
# what's easy-proc
Easy-proc is a nodejs lib which is easy to define and run a procedure.
It may be used for changing async steps to sync steps.
It may be used for parallel and serial Processing.

## Serial Procedure

```
var SerialProc = require("./easy-proc").SerialProc;
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

```

The SerialProc make sure read file1 first, and then read file2.
If exception happens when reading file1, then program will callback false at first, and file2 will not be read.

##  Parallel produre

```
var ParallelProc = require("./easy-proc").ParallelProc;
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

var pp = new ParallelProc("pp").then(readfile1, readfile2);

var ctx1 = {};
pp.go(ctx1, onFinished);

//ctx2 isn't affected by ctx1
var ctx2 = {};
pp.go(ctx2, onFinished);

```

The file1 and file2 will be read in the same time, and ParallelProc will wait tow files is read finished, and then callback onFinished.
If exception happens when reading file1 or reading file2, it will callback onFinished(false), othewise, onFinished(true).
