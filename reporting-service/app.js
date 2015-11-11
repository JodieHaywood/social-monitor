global.apiconfig = require('./config.json');
global.acquisitionSocket = null;
global.socket = null;

var app = require('http').createServer();
var io = require('socket.io')(app);
var ioClient = require('socket.io-client');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/social-monitor', function (error) {
    if (error) {
        throw error;
    }
});

//TODO force strict
var messageSchema = new Schema({message_id: {type: String, index: true}}, {strict: false});
var Message = mongoose.model('Message', messageSchema);

global.acquisitionSocket = ioClient.connect(global.apiconfig.node_address, {reconnect: true});

global.acquisitionSocket.on('connection', function (data) {
    console.log(data);
});

global.acquisitionSocket.on('disconnect', function () {
    console.log({ msg: 'disconnected' });
});

require('./modules/subscriptions.js');

io.on('connection', function (socket) {
    global.socket = socket;
    // when first connected, get latest 20 from DB
    Message.find().sort({_id: 1}).limit(50).exec(function (err, results) {
        results.forEach(function (data) {
            global.socket.emit('update', data);
        });
    });
});

io.listen(3001);
