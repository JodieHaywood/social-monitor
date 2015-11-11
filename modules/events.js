var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var messageMetaSchema = new Schema({}, {strict: false, _id: false});
var messageSchema = new Schema({
    message_id: {
        type: String,
        index: true
    },
    message_source: {
        type: String,
        index: true
    },
    message_date: {
        type: Date
    },
    message_text: {
        type: String
    },
    message_meta: messageMetaSchema
}, {
    strict: true
});
var Message = mongoose.model('Message', messageSchema);

mongoose.connect('mongodb://localhost/social-monitor-' + global.apiconfig.search, function (error) {
    if (error) {
        throw error;
    }
});

process.on('smData', function (data) {
    var newMessage = new Message(data);
    var upsertData = newMessage.toObject();

    delete upsertData._id;

    Message.update({message_id: data.message_id}, upsertData, {upsert: true}, function (error, status) {
        if (error) {
            process.emit('smError', {source: 'mongo update', error: error});
        }

        if (status.upserted && global.socket) {
            global.socket.emit('update', upsertData);
        }
    });
});

process.on('smError', function (error) {
    console.error(error);
});