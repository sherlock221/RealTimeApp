/**
 * websocket 处理
 * @param io
 */
module.exports.use = function(io){
    io.on('connection', function(socket){
        //推送信息
        socket.emit('news', { hello: 'world' });

        //接受客户端的信息
        socket.on('client', function (data) {
            console.log(data);
        });

        //客户端断开 socket被关闭
        socket.on('disconnect', function () {
            console.log("disconnect...");
            io.sockets.emit('user disconnected');
        });
    });

}
