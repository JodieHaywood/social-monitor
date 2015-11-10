var Twitter = require('twitter');
var twitter = new Twitter(apiconfig.twitter);

twitter.stream('statuses/filter', {track: apiconfig.search}, function (stream) {
    stream.on('data', function (data) {
        var msg = {
            message_text: data.text,
            message_id: data.id,
            message_date: data.created_at,
            message_source: "twitter",
            user: {
                user_id: data.user.id
            }
        };

        process.emit('smData', msg);
    });

    stream.on('error', function (error) {
        smError(error);
    });
});