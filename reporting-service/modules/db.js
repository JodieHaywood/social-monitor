mongoose.connect('mongodb://localhost/social-monitor', function (error) {
    if (error) {
        throw error;
    }
});

//TODO force strict
var messageSchema = new Schema({message_id: {type: String, index: true}}, {strict: false});
var Message = mongoose.model('Message', messageSchema);