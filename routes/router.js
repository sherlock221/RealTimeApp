//log
var log = require("./../log").logger("router");

/**
 * 路由命名空间配置
 * @type {exports}
 */
var indexRouter = require("./index");
var userRouter  = require("./users");
module.exports.use = function(app){
    //配置命名空间
    app.use("/",indexRouter);
    app.use("/user",userRouter);
};
