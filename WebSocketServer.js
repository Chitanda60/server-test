// import http from 'http'
// import fs from 'fs'
// import ws from 'ws'


// let server = http.createServer((req, res) => {
// 	res.writeHeader(200, {
//         'Content-Type':'text/html;charset=utf-8'
//     })
//     res.end('shemei')
// })
// server.listen(3001);

// // 收到upgrade请求后升级协议
// server.on('upgrade', (req, socket, upgradeHead) => {
// 	console.log('zhixia');
// })

// 测试服务器
var WebSocketServer = require('ws').Server;
var socketServer = new WebSocketServer({ port: 3001 });

//to store all connected clients  
var clients = [];

socketServer.on('connection', function(socket) {  
    //broadcast to clients when new message comes from one client
    socket.on('message', function(message) {          
        socket.send(message)
    });
});

console.log('socketServer is listening on 3001...');