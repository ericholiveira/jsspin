var punycode = require('punycode');
var dChar = 'd'.charCodeAt(0);
var clockPuny = [];
for (i=0;i<23;i++){
  clockPuny.push(punycode.decode(String.fromCharCode(dChar+i)+'x8h'));
}
var monkeyPuny = [punycode.decode('9o8h'),punycode.decode('g48h'),punycode.decode('h48h'),punycode.decode('i48h')];
var spinnerTypes={
  _1    : '⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏',
  _2    : '⠋⠙⠚⠞⠖⠦⠴⠲⠳⠓',
  _3    : '⠄⠆⠇⠋⠙⠸⠰⠠⠰⠸⠙⠋⠇⠆',
  _4    : '⠋⠙⠚⠒⠂⠂⠒⠲⠴⠦⠖⠒⠐⠐⠒⠓⠋',
  _5    : '⠁⠉⠙⠚⠒⠂⠂⠒⠲⠴⠤⠄⠄⠤⠴⠲⠒⠂⠂⠒⠚⠙⠉⠁',
  _6    : '⠈⠉⠋⠓⠒⠐⠐⠒⠖⠦⠤⠠⠠⠤⠦⠖⠒⠐⠐⠒⠓⠋⠉⠈',
  _7    : '⠁⠁⠉⠙⠚⠒⠂⠂⠒⠲⠴⠤⠄⠄⠤⠠⠠⠤⠦⠖⠒⠐⠐⠒⠓⠋⠉⠈⠈',
  _8    : '|/-\\',
  _9    : '◴◷◶◵',
  _10   : '◰◳◲◱',
  _11   : '◐◓◑◒',
  _12   : '▉▊▋▌▍▎▏▎▍▌▋▊▉',
  _13   : '▌▄▐▀',
  _14   : '╫╪',
  _15   : '■□▪▫',
  _16   : '←↑→↓',
  _17   : clockPuny,
  _18   : monkeyPuny
};
var DEFAULT_TYPE = spinnerTypes._8;
var DEFAULT_INTERVAL = 400;
var back = function(){
  process.stdout.write(String.fromCharCode(8));
};
function Spinner(options){
  options = options || {};
  this.text = options.text || DEFAULT_TYPE;
  this.interval = options.interval || DEFAULT_INTERVAL;
  this.intervalId=null;
  this.spawn = options.spawn || false;
}
Spinner.prototype.start = function(){
  var currentId = 0;
  var text = this.text;
  process.stdout.write('\x1b[?25l');//hide cursor
  process.stdout.write(text[currentId++]);
  this.intervalId = setInterval(function(){
    back();
    process.stdout.write(text[currentId++]);
    currentId = currentId % text.length;
  },this.interval);
};
Spinner.prototype.stop = function(){
  if(this.intervalId){
    back();
    process.stdout.write(String.fromCharCode(32));
    back();
    process.stdout.write('\x1b[?25h');//show cursor
    clearInterval(this.intervalId);
  }
};
Spinner.prototype.defaultTexts = spinnerTypes;
module.exports = Spinner;
