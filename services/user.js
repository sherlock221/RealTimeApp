var async = require("async");

var UserDao  = require("./../models/userModel");
var UserBean =  require("./../bean/userBean");
var userDao = new UserDao();

var UserService = function(){

}


/**
 * 创建/返回 user对象
 * @param uid
 * @param cb
 */
UserService.prototype.checkUser = function(uid,cb){

    //串行执行sql
    async.waterfall([
        //启动
        function(callback){
            callback(null,uid);
        },

        //查询用户
        function(uid,callback){
            userDao.findUserById(uid,function(err,user){
                 callback(err,user);
            });
        },
        //是否创建用户
        function(user,callback){
            if(user && user.length <=0){
                var newUser = new UserBean();
                userDao.create(newUser,function(err,result){
                    if(!err){
                       newUser.ID= result.insertId;
                    }
                    //封装成统一的user
                    callback(err,newUser);
                });
            }
            else{
                callback(null,user[0]);
            }
        }
    ],cb);

}



module.exports = UserService;
