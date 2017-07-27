
var exec = require('child_process').exec; 

function Robot() {
    this.say = function(words) {
        exec('say '+ words);
    }
}

module.exports = exports = new Robot();
