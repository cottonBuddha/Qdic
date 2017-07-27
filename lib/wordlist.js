
var fs = require('fs');
path = require('path');
var output = require('./output.js');
var exec = require('child_process').exec;
var config = require('./config.js')

function WordList() {
    this.saveWord = function(wordInfo){
        var wordlistPath = config.getWordListPath();
        fs.appendFile(wordlistPath,wordInfo+'\n',function(){
            output.outputAttention('  已保存到单词本^_^  ');
        })
    }

    this.showWordlist = function() {
        var wordlistPath = config.getWordListPath();
        var cmdStr = 'cat ' + wordlistPath;
        exec(cmdStr,function(err,stdout,stderr){
            if (err) {
                console.log(err);
                output.outputAttention('执行失败！');
            } else {
                console.log(stdout);
            }
        });
    }
}

var exports = new WordList();
module.exports = exports;
