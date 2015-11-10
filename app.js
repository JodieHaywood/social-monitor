global.apiconfig = require('./config.json');
global.socket = null;

var app = require('http').createServer();
var io = require('socket.io')(app);

io.on('connection', function (socket) {
    global.socket = socket;
    global.socket.emit('connection', { msg: "connected to acquisition server" })
});

require('./modules/error');
require('./modules/twitter');
require('./modules/youtube');
require('./modules/instagram');
require('./modules/events');

app.listen(3000);