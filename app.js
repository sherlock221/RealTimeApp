//导入命名空间
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var ejs   = require("ejs");
var middleWareUtil  = require("./util/middleWareUtil");

var router = require("./routes/router");

var log4j = require("./log");
var app = express();

//让ejs使用扩展名html文件
//app.engine('.html', ejs.__express);
//app.set('view engine', 'html');
app.set('view engine', 'ejs');


//中间件使用
log4j.use(app);
app.use(favicon());
//log4j代替 需要查看请求状态请开启
//app.use(logger('dev'));
app.use(bodyParser());
app.use(cookieParser());
app.use(session({ secret: "keyboard cat" }));
app.use(express.static(path.join(__dirname, 'public')));
//打印http参数
app.use(middleWareUtil.consoleHttpParam);

//路由配置
router.use(app);

//打印当前的环境
console.log(app.get("env"));

//是否在控制台显示错误堆栈信息
var showErrOnConsole = false;
if("development" == app.get("env")){
      showErrOnConsole = true;
}

//配置404错误/页面
app.use(function(req, res, next) {
    var err = new Error('资源未找到');
    err.status = 404;
    next(err);
});


//捕获全系统异常
app.use(function(err, req, res, next){
    //设置
    res.charset = 'utf-8';
    res.status(err.status || 500);


    //跳转至error页面
    res.render('error', {
        message: err.message,
        error: err
    });

//    //返回json
//    res.json({ error: err.message });

    //打印到控制台
    showErrOnConsole == true ? console.error(err.stack) : "";
});


module.exports = app;

