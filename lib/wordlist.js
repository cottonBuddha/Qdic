
var fs = require('fs');
path = require('path');
var wordlistPath = path.join(process.env.HOME, '/Desktop/wordlist.txt');//默认在桌面
var QDICRC = path.join(process.env.HOME, '.qdicrc');
var output = require('./output.js');

function WordList() {
    this.saveWord = function(wordInfo){
        output.outputAttention('  已保存到单词本^_^  ');
        fs.appendFile(wordlistPath,wordInfo+'\n',function(){
            output.outputAttention('  已保存到单词本^_^  ');
        })
    }

    this.showWordlist= function() {
        console.log('niamnima');
        console.log(output);
        // output.outputAttention('  已保存到单词本^_^  ');
        output.outputFileContent(wordlistPath);
    }
}
var exports = new WordList();
module.exports = exports;
