var express = require('express');
var async = require("async");
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res) {

    var insert = function (callback) {
        setTimeout(function () {
            console.log("insert");
            callback(null, 'one');
        }, 1000);

    }
    var select = function (callback) {
        setTimeout(function () {
            console.log("select");
            callback(null, 'two');
        }, 300);

    }

    var update = function (callback) {
        console.log("update");
        callback(null, 'three');
    }

    //串行执行
    //行执行，一个函数数组中的每个函数，每一个函数执行完成之后才能执行下一个函数。
    //遇到错误 则会打断 进入err函数
//    async.series([insert,select,update],function(err,result){
//        if(err){
//            console.log(err);
//        }
//        console.log(result);
//    });

    //并行执行
    //每个函数都是立即执行，不需要等待其它函数先执行。传给最终callback的数组中的数据按照tasks中声明的顺序，而不是执行完成的顺序。
//    async.parallel([insert,select,update],function(err,result){
//        if(err){
//            console.log(err);
//        }
//        console.log(result);
//    });

});


module.exports = router;
