# Qdic

一个命令行查词工具，使用了有道、百度的api

![image]("https://github.com/cottonBuddha/Qdic/demo.png")
## 安装
```    
    $ npm install qdic -g
```
## 使用
```
    $ qdic cotton //查英文
    $ qdic 棉花    //查中文
```
## 选择词典
```
    Options:

    -g ,--google   使用谷歌翻译
    -b ,--baidu    使用百度翻译
    -y ,--youdao   使用有道词典
    -d ,--default  设置当前词典为默认词典
```
```
    $ qdic buddha -b     //使用百度翻译
    $ qdic buddha -b -d  //使用百度翻译,并将百度翻译设为默认
```
## 保存至单词列表
```
    Options:
    
    -s ,--save     保存到单词本

    Commands:

    wordlist|wl    查看单词列表
    setpath <path> 设置单词列表路径//默认在桌面
```
```
    $ qdic buddha -s  //查词并保存
    $ qdic wl         //查看已保存的单词
    $ qdic setpath /Users/jqs/Desktop/Demo //保存至桌面的Demo文件夹中   
    
```
## 设置
```
说明：
    本工具默认使用作者自己的百度翻译及有道词典API key，
    如需设置自己的账号，可前往
    
    1.有道API key:
    http://fanyi.youdao.com/openapi?path=data-mode
    2.百度API key:
    http://fanyi-api.baidu.com/api/trans/product/index

    进行申请
    并使用如下命令进行配置。
```
```
    Commands:

    setbk <key>         //设置百度api_key
    setyn <name>        //设置有道账户名
    setyk <key>         //设置有道api_key
    config              //显示当前设置
    reset               //重置
```
## 许可证

MIT
