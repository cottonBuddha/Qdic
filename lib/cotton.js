#!/usr/bin/env node

var request = require('request');
var program = require('commander');
var chalk = require('chalk');
var dic = require('./dic.js');
var output = require('./output.js');
var exec = require('child_process').exec;
var robot = require('./robot.js');
var wordlist = require('./wordlist.js');
var config = require('./config.js');

//查词典
program
    .usage('[options] [word]')
    .arguments('[word...]')
    .option('-b ,--baidu','使用百度翻译')
    .option('-y ,--youdao','使用有道词典')
    .option('-s ,--save','保存到单词本')
    .action(function(word,options){
        cmdValue = word;
        var toSave = options.save; 

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
        wordlist.showWordlist();
    })

//设置百度key
program
    .command('setbk <key>')
    .action(function(key){
        cmdValue = "setbk";
        if (key) {
            config.setBKey(key);
        }
    })

//设置有道name
program
    .command('setyn <name>')
    .action(function(name){
        cmdValue = "setyn";
        if (name) {
            config.setYName(name);
        }
    })

//设置有道Key
program
    .command('setyk <key>')
    .action(function(key){
        cmdValue = "setyk";
        if (key) {
            config.setYKey(key);
        }
    })

program
    .command('setpath <path>')
    .action(function(path){
        cmdValue = "path";
        if (path) {
            config.setWordListPath(path);
        }
    })

program
    .command('config')
    .action(function(){
        cmdValue = "config";
        config.showConfig();
    })

program
    .command('reset')
    .action(function(){
        cmdValue = "reset";
        config.reset();
    })

program
    .version('0.0.1')
    .description(chalk.bold.yellow('a dictionary cli'))
    .parse(process.argv)

if (typeof cmdValue === 'undefined') {
   output.outputAttention(" 请输入指令！")
   process.exit(1);
}
