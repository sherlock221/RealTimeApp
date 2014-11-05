var express = require('express');
var router = express.Router();
var UserService = require("./../services/user");

var  userService = new  UserService();

/**
 * 首次访问获得UID
 * @param id 用户id
 * @result user 用户信息
 */
router.get('/', function(req, res,next) {
    var  uid = req.query.id;
    //uid 存在查询返回
    userService.checkUser(uid,function(err,result){
        if(err){
             console.log(err);
             next(err);
        }
        else{
            res.json(result);
        }
    });
});


router.get("/with",function(){

});


module.exports = router;
