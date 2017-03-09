// 测试服务器
var WebSocketServer = require('ws').Server;  
var socketServer = new WebSocketServer({ port: 3001 });
  
//to store all connected clients  
var clients = [];  
  















  
socketServer.on('connection', function(socket) {  
  
    //if not the specified origin, disconnect the socket  
    var origin = socket.upgradeReq.headers.origin;  
    if (origin !== 'http://localhost') {  
        socket.close();  
        return;  
    }  
  
    //add to clients when socket is connected  
    clients.push(socket);  
  
    //broadcast to clients when new message comes from one client  
    socket.on('message', function(message) {  
        console.log(message);  
        clients.forEach(function(client) {  
            if (client !== socket) {  
                client.send(message);  
            }  
        });
    });
  
    //remove from clients when socket is offline or disconnected  
    socket.on('close', function() {  
        for (var i = 0; i < clients.length; i++) {  
            var client = clients[i];  
            if (client === socket) {  
                clients.splice(i, 1);  
            }  
        }  
    });  
});

console.log('socketServer is listening on 3001...'); 