global.apiconfig = require('./config.json');
global.socket = null;

var app = require('http').createServer();
var io = require('socket.io')(app);
var os = require("os");

require('./modules/error');
require('./modules/events');
require('./modules/twitter');
require('./modules/youtube');
require('./modules/instagram');

io.on('connection', function (socket) {
    global.socket = socket;
    global.socket.emit('connection', {msg: "connected to " + global.apiconfig.node_name + " on " + os.hostname()});
});

app.listen(3000);