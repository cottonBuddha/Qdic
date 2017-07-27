
var chalk = require('chalk');
// var wordlist = require('./wordlist.js');
var fs = require('fs');
var exec = require('child_process').exec; 

var frontLongSpace   = '                    ' ;
var frontMiddleSpace = '           ' ;
var frontShortSpace  = '    ' ;

function Output() {

    this.outputAttention = function(str) {
        formatLineLog(str);
    }

    this.longFrontSpaceLog = function(str){
        frontLongSpaceLog(str);
    }

    this.outputBaiduWordCard = function(wordInfo,toSave) {
        frontShortSpacelog('翻译：');
        if (wordInfo.hasOwnProperty('trans_result')){
            var transResult = wordInfo.trans_result;
            transResult.forEach(function(element){

                if (element.hasOwnProperty('dst')){
                    frontShortSpacelog(element.dst);
                }

                if (toSave){
                    wordlist.saveWord(element.src+':'+element.dst);
                }

            },this);
        }
    }

    this.outputYoudaoWordCard =function(wordInfo,toSave) {
        console.log(frontLongSpace+chalk.bgMagenta(wordInfo.query)+':'+ chalk.magenta(wordInfo.translation)+'\n');

        var cmdStr1 = 'say' + ' ' + wordInfo.query;
        var cmdStr2 = 'say' + ' ' + wordInfo.translation;

        exec(cmdStr1+';'+cmdStr2);

        if (toSave){
            wordlist.saveWord(wordInfo.query+':'+wordInfo.translation);
        }
        if (wordInfo.hasOwnProperty('basic') && wordInfo.basic.hasOwnProperty('explains')){
            var explains = wordInfo.basic.explains;
            var explainsStr = "";
            explains.forEach(function(element){
                frontMiddleSpacelog(element);
            },this);
            console.log('');
        }
        if (wordInfo.hasOwnProperty('web')) {
            var webInfo = wordInfo.web;
            for (var key in webInfo) {
                if (webInfo.hasOwnProperty(key)) {
                    var element = webInfo[key];
                    console.log(frontMiddleSpace+'关键词：'+chalk.red(element.key));
                    element.value.forEach(function(element) {
                        console.log(frontLongSpace+element+'');
                    }, this);
                }
            }
        }
    }

    this.outputFileContent = function(filePath){
        fs.open('./wordlist.txt','r','777',function(error,data){
            if (!error){
                console.log(data);
            }
        })
    }

    var frontLongSpaceLog = function(str) {
        console.log(frontLongSpace+str);
    }

    var frontMiddleSpacelog = function(str) {
        console.log(frontMiddleSpace+str);
    }

    var frontShortSpacelog = function(str) {
        console.log(frontShortSpace+str);
    }

    var formatLineLog = function(str) {
        var length = 49;
        if (str.length > length) {
            console.log('\n==='+str+'===\n');
        } else {
            var num = (length-str.length * 2) * 0.5
            var formatStr='';
            for (var i=0;i<num;i++) {
                formatStr = formatStr + '=';
            }
            console.log('\n'+formatStr+str+formatStr+'\n');
        }
    }
}

var exports = new Output();
module.exports = exports;
