#!/usr/bin/env node

var request = require('request');
var program = require('commander');
var chalk = require('chalk');
var dic = require('./dic.js');
var output = require('./output.js');
var exec = require('child_process').exec;
var robot = require('./robot.js');
var wordlist = require('./wordlist.js');
var fs = require('fs');

output.outputAttention('执行失败！');
wordlist.showWordlist();
//查词典
program
    .usage('[options] [word]')
    .arguments('[word...]')
    .option('-b ,--baidu','使用百度翻译')
    .option('-y ,--youdao','使用有道词典')
    .option('-s ,--save','保存到单词本')
    .action(function(word,options){
        cmdValue = word;
        var toSave=options.save; 

        if (options.baidu) {
            dic.lookUp(word,'baidu',toSave);
        } else if (options.youdao) {
            dic.lookUp(word,'youdao',toSave);
        } else {
            dic.lookUp(word,'youdao',toSave);
        }
  }) 

//查看单词本
program
    .command('wordlist')
    .alias('wl')
    .action(function(){
        cmdValue = "wordlist";
        var cmdStr = 'cat /Users/jqs/Desktop/qscript/wordlist.txt';
        exec(cmdStr,function(err,stdout,stderr){
            if (err) {
                console.log(err);
                output.outputAttention('执行失败！');
            } else {
                console.log(stdout);
            }
        });
    })

//设置百度key
program
    .command('setb')
    .action(function(){
        cmdValue = "setb";
        wordlist.showWordlist();
    })

program
    .version('1.0.0')
    .description(chalk.bold.yellow('a dictionary cli'))
    .parse(process.argv)

if (typeof cmdValue === 'undefined') {
   output.outputAttention(" 请输入指令！")
   process.exit(1);
}
