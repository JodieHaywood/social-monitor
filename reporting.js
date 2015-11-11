var app = require('http').createServer();
var io = require('socket.io')(app);
var ioClient = require('socket.io-client');
global.socket = null;

//TODO put in config
var aSocket = ioClient.connect('http://localhost:3000', {reconnect: true});

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


function getTotals() {
    Message.find({}).count(function (error, result) {
        if (error) {
            console.log(error);
        }

        if (global.socket) {
            global.socket.emit('totals', {total: result});
        }
    });
}

aSocket.on('connection', function (data) {
    console.log(data);
    getTotals();
});

aSocket.on('update', function (data) {
    if (global.socket) {
        global.socket.emit('update', data);
        getTotals();
    }
});

io.on('connection', function (socket) {
    global.socket = socket;
    // when first connected, get latest 20 from DB
    Message.find().sort({_id:1}).limit(50).exec(function (err, results) {
      results.forEach(
        function(data) {
          global.socket.emit('update', data);
        }
      );
    });
});


io.listen(3001);
