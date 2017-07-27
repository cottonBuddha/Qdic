
var exec = require('child_process').exec; 

function Robot() {
    this.say = function(words) {
        exec('say '+ words);
    }
}

var exports = new Robot();
module.exports = exports;
