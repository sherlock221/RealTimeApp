var db        = require("./db");

var  UserModel = function(){};




/**
 * 根据id查询
 * @param id
 * @param callBack
 */
UserModel.prototype.findUserById = function(uid,callBack){
    db.execQuery({
        "sql": "SELECT * FROM T_USERS  U  WHERE  U.ID=?",
        "args": [uid],
        "handler": callBack
    });
}

/**
 * 创建用户
 * @param user
 * @param callBack
 */
UserModel.prototype.create = function(user,callBack){
    db.execQuery({
        "sql": "INSERT INTO T_USERS(USERNAME, USERPHONE, CRTTIME) VALUES(?,?,NOW())",
        "args": [user.userName, user.userPhone],
        "handler": callBack
    });
}

/**
 * 更新用户
 * @param userJson
 * @param callback
 */
UserModel.prototype.update = function(user,callBack){

    db.execQuery({
        "sql": "UPDATE T_USERS  SET  USERNAME=?, USERPHONE=?, ISGETCODE=?  WHERE id=?",
        "args": [user.userName,user.userPhone,user.isGetCode,user.id],
        "handler": callBack
    });
}


module.exports = UserModel;


