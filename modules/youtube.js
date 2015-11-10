var YouTube = require('youtube-node');
var youTube = new YouTube();
youTube.setKey(apiconfig.youtube);

youTube.search(apiconfig.search, 10, function (error, result) {
    if (error) {
        return smError(error);
    }

    setInterval(function () {
        clean(result);
    }, 60000);

    function clean(data) {
        for (var i = 0, len = data.items.length; i < len; i++) {
            var msg = {
                message_text: data.items[i].snippet.title,
                message_id: data.items[i].id.videoId,
                message_date: data.items[i].snippet.publishedAt,
                message_source: "youtube"
            };

            process.emit('smData', msg);
        }
    }
});