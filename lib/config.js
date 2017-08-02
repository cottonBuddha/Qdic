
var path = require('path');
var fs = require('fs');
var QDICRC = path.join(process.env.HOME, '.qdicrc');
var echo = require('node-echo');
var ini = require('ini');

var baidu_key = "20170309000041877";
var youdao_key = "1354599733";
var youdao_keyfrom = "cotton";
var wordlistPath = path.join(process.env.HOME, '/Desktop/wordlist.txt');//默认在桌面
var defDic = "youdao";

var getConfig = function() {
    return fs.existsSync(QDICRC) ? ini.parse(fs.readFileSync(QDICRC, 'utf-8')) : {}
}

function Config() {

    var getConfig = function() {
        return fs.existsSync(QDICRC) ? ini.parse(fs.readFileSync(QDICRC, 'utf-8')) : {}
    }

    var setConfig = function(config, callback) {
        echo(ini.stringify(config), '>', QDICRC, callback);
    }

    this.setBKey = function(key) {
        var config = getConfig();
        config.BKey = key;
        setConfig(config, function(err) {
            if (err) return exit(err);
            console.log('设置完成');
        })
    }

    this.getBKey = function() {
        var config = getConfig();
        return config.BKey ? config.BKey : baidu_key;
    }

    this.setYKey = function(key) {
        var config = getConfig();
        config.YKey = key;
        setConfig(config, function(err) {
            if (err) return exit(err);
            console.log('设置完成');
        })
    }

    this.getYKey = function() {
        var config = getConfig();
        return config.YKey ? config.YKey : youdao_key
    }

    this.setYName = function(name) {
        var config = getConfig();
        config.YName = name;
        setConfig(config, function(err) {
            if (err) return exit(err);
            console.log('设置完成');
        })        
    }

    this.getYName = function() {
        var config = getConfig();
        return config.YName ? config.YName : youdao_keyfrom;
    }

    this.setWordListPath = function(listPath) {
        var config = getConfig();
        config.listPath = listPath; 
        setConfig(config, function(err) {
            if (err) return exit(err);
            console.log('设置完成');
        }) 
    }

    this.getWordListPath = function() {
        var config = getConfig();
        var listpath = config.listPath;
        if (listpath) {
            var extname = path.extname(listpath);
            if (extname != '' && extname != '.txt') {
                console.log('路径有问题，需要一个.txt的文件');
            } else {
                listpath = listpath + '/wordlist.txt';
            }
            return listpath;
        } else {
            return wordlistPath;
        }
    }

    this.showConfig = function() {
        var config = getConfig();
        console.log("默认词典: " + this.getDefDic())
        console.log("有道账户名: " + this.getYName());
        console.log("有道api_key: " + this.getYKey());
        console.log("百度api_key: " + this.getBKey());
        console.log("单词表路径: " + this.getWordListPath());
    }

    this.reset = function() {
        var config = getConfig();
        delete config.BKey;
        delete config.YKey;
        delete config.YName;
        setConfig(config, function(err) {
            if (err) return exit(err);
            console.log('设置完成');
        })
    }

    this.getDefDic = function() {
        var config = getConfig();
        return config.defDic ? config.defDic : defDic;
    }

    this.setDefDic = function(dic) {
        var config = getConfig();
        config.defDic = dic;
        setConfig(config, function(err) {
            if (err) return exit(err);
            console.log('词典默认为：' + dic);
        })  
    }

    
}

module.exports = new Config();