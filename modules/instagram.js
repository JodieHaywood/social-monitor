// Instagram
Instagram = require('instagram-node-lib');
Instagram.set('client_id', apiconfig.instagram.client_id);
Instagram.set('client_secret', apiconfig.instagram.client_secret);
Instagram.set('callback_url', 'callback');

Instagram.tags.recent({
    name: apiconfig.search, complete: function (result) {
        setInterval(function () {
            clean(result);
        }, 1000);

        function clean(data) {
            for (var i = 0, len = data.length; i < len; i++) {
                var msg = {
                    message_text: data[i].caption.text,
                    message_id: data[i].id,
                    message_date: new Date(parseInt(data[i].created_time) * 1000),
                    message_source: "instagram",
                    user: {
                        user_id: data[i].user.id
                    }
                };

                process.emit('smData', msg);
            }
        }
    }
});