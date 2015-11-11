var Twitter = require('twitter');
var twitter = new Twitter(apiconfig.twitter);

twitter.stream('statuses/filter', {track: apiconfig.search}, function (stream) {
    stream.on('data', function (data) {
        var msg = {
            message_text: data.text,
            message_id: data.id,
            message_date: data.created_at,
            message_source: "twitter",
            message_meta: {
                user: {
                    user_id: data.user.id.toString(),
                    user_description: data.user.description,
                    user_name: data.user.name,
                    user_screen_name: data.user.screen_name
                },
                geo: data.geo
            }
        };

        process.emit('smData', msg);
    });

    stream.on('error', function (error) {
        process.emit('smError', {source: 'twitter', error: error});
    });
});