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
        //广播
//        io.sockets.emit("message_client","链接成功!");

        //加入全局的缓存
        socket.on('uid', function (data) {
            this.uid = data.id;
            clients.put(data.id,this);
        });

        //开始分享
        socket.on("start",function(data){
            var uid =  data.id;
            var fromId = data.fromId;
            var  fig = data.fig;

            var  my = clients.get(uid);

            if(fromId){
                var  from = clients.get(fromId);
                from.emit("star_end",{fig : data.fig});
            }

            my.emit("star_end",{fig : data.fig});
        });

//        //接受客户端的信息
//        socket.on('message', function (data) {
//            //点对点
//           this.emit("message_client",{test:this.id});
//            //广播所有的客户端
//           // io.sockets.emit("message_client",{test:this.id});
//        });

        //客户端断开 socket被关闭
        socket.on('disconnect', function () {
            console.log("disconnect...",this.id);
            clients.remove(this.uid);
        });

    });
}

