var YouTube = require('youtube-node');
var youTube = new YouTube();
youTube.setKey(apiconfig.youtube);

setInterval(function () {
    youTube.search(apiconfig.search, 10, function (error, data) {
        if (error) {
            process.emit('smError', {source: 'youtube', error: error});
        }

        for (var i = 0, len = data.items.length; i < len; i++) {
            var msg = {
                message_text: data.items[i].snippet.title,
                message_id: data.items[i].id.videoId,
                message_date: data.items[i].snippet.publishedAt,
                message_source: "youtube",
                message_meta: {
                    message_description: data.items[i].snippet.description,
                    media: {
                        media_images: data.items[i].snippet.thumbnails
                    }
                }
            };

            process.emit('smData', msg);
        }
    });
}, 15000);