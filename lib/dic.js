
var request = require('request');
var MD5 = require('./md5.js');
var output = require('./output.js');
var config = require('./config.js')
var wordlist = require('./wordlist.js');

function Dic() {
    this.lookUp = function(word,dic,toSave) {
        console.log();
        var wordContent = "";
        for (var key in word) {
            if (word.hasOwnProperty(key)) {
                var element = word[key];
                wordContent = wordContent+' '+element;
            }
        }

        if (dic === 'baidu') {
            lookUpInBaidu(wordContent,toSave);
        }

        if (dic === 'youdao') {
            lookUpInYouDao(wordContent,toSave);
        }
    }

    var lookUpInBaidu = function(word,toSave) {
        var qStr = '?q='+word;
        var fromStr = '&from=auto';
        var toStr = '&to=auto';
        var appid = config.getBKey();
        var appidStr = '&appid='+appid;
        var salt = (new Date).getTime().toString();
        var saltStr = '&salt='+salt;
        var key = 'wmyOiBeCuy47U4HEVAOx';
        var tempStr = appid + word + salt +key;
        var signStr = '&sign='+MD5.MD5(tempStr);

        var urlStr = encodeURI('http://api.fanyi.baidu.com/api/trans/vip/translate'+qStr+fromStr+toStr+appidStr+saltStr+signStr);
        request(urlStr, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var jsonBody = JSON.parse(body);
                output.outputBaiduWordCard(jsonBody);

                if (toSave) {
                    var transResult = jsonBody.trans_result;
                    transResult.forEach(function(element) {
                        wordlist.saveWord(element.src+':'+element.dst);
                    }, this);
                }              
            } else {
                output.outputAttention('查询出错，抱歉！');
            }
        });
    }

    var lookUpInYouDao = function(word,toSave) {
        var YName = config.getYName();
        var YKey = config.getYKey();
        var urlStr = 'http://fanyi.youdao.com/openapi.do?keyfrom=' + YName + '&key=' + YKey + '&type=data&doctype=json&version=1.1&q='
        urlStr = encodeURI(urlStr + word);
        request(urlStr, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var jsonBody = JSON.parse(body);
                output.outputYoudaoWordCard(jsonBody);
                if (toSave){
                    wordlist.saveWord(jsonBody.query+':'+jsonBody.translation);
                }
            } else {
                output.outputAttention('查询出错，抱歉！');
            }
        });
    }
}

var exports = new Dic();
module.exports = exports;
