
# what's easy-proc
Easy-proc is a nodejs lib which is easy to define and run a procedure.
It may be used for changing async steps to sync steps.
It may be used for parallel and serial Processing.

## Serial Procedure

```
var SerialProc = require("./easy-proc").Serial;
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
var ParallelProc = require("./easy-proc").Parallel;
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

The file1 and file2 will be read in the same time, and ParallelProc will wait for tow files is read finished, and then callback onFinished.
If exception happens when reading file1 or reading file2, it will callback onFinished(false), othewise, onFinished(true).

## EasyProc
EasyProc is base on SerialProc and ParallelProc, and it support both.

```
var EasyProc = require("./easy-proc");
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

function readfile3(ctx, next) {
	fs.readFile('file3.txt','utf-8',function(err,data){
		ctx.file3 = data;
		console.log("file3.txt");
    	err?next(false):next(true);  
	});
}

function readfile4(ctx, next) {
	fs.readFile('file4.txt','utf-8',function(err,data){
		ctx.file4 = data;
		console.log("read file4.txt");
    	err?next(false):next(true);  
	});
}

var ep = new EasyProc("easy-proc-demo")
.then(readfile1)
.then(readfile2, readfile3)
.then(readfile4);

var ctx = {};
ep.go(ctx, onFinished);
```
If readfile1 fail, the procedure will be return false at the first time.If readfile2 fail or readfile3 fail, it will wait for each other, and then callback false.If readfile1, readfile2, readfile3 success, readfile4 will run alone at the last time.
