var app = require('./app.js');
// Socket io
var server = require('http').Server(app);
var io = require('socket.io')(server);

var userOnline = [];

io.on('connection', function(socket) {
   console.log('connection');
   socket.on('client-send-peer-id', function(data) {
       userOnline.push(data.peerId);
       // if (userOnline.length > 2) userOnline = [];
       console.log(data);
      io.sockets.emit('server-send-user-online', {userOnline: userOnline});
   })
});





server.listen(4000, () => {
    console.log('Start!');
});
