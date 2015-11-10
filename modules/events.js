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

process.on('smData', function (data) {
    var newMessage = new Message(data);
    var upsertData = newMessage.toObject();

    delete upsertData._id;

    Message.update({message_id: data.message_id}, upsertData, {upsert: true}, function (error, status) {
        if (error) {
            process.emit('smError', error);
        }

        if (status.upserted && global.socket) {
            global.socket.emit('update', upsertData);
        }
    });
});