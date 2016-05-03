var EasyProc = require("./lib/easy-proc");
var SerialProc = require("./lib/serial-proc");
var ParallelProc = require("./lib/parallel-proc");

EasyProc.Serial = SerialProc;
EasyProc.Parallel = ParallelProc;

module.exports = EasyProc;