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
  _16   : '←↑→↓'
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
    clearInterval(this.intervalId);
  }
};
Spinner.prototype.defaultTexts = spinnerTypes;
module.exports = Spinner;
var sp = new Spinner();