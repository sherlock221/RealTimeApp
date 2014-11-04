var  JString = require("../util/jstring");



/**
 * websocket 处理
 * @param io
 */
module.exports.use = function(io){

    //当前连接客户端数量
    var  clients = new JString.Map();

    //监听 客户端连接
    io.on('connection', function(socket){
        clients.put(socket.id,socket);
        console.log(clients.size());

        //接受客户端的信息
        socket.on('message', function (data) {
            //点对点
           this.emit("message_client",{test:this.id});
            //广播所有的客户端
           // io.sockets.emit("message_client",{test:this.id});
        });

        //客户端断开 socket被关闭
        socket.on('disconnect', function () {
            console.log("disconnect...",this.id);
            clients.remove(this.id);
        });

    });




}
