var app = require('http').createServer();
//var io = require('socket.io')(app);
var ioClient = require('socket.io-client');

//TODO put in config
var aSocket = ioClient.connect('http://localhost:3000', {reconnect: true});

aSocket.on('connection', function (data) {
    console.log(data);
});

aSocket.on('update', function (data) {
    console.log(data);
});

//io.listen(3001);