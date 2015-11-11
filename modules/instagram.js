// Instagram
Instagram = require('instagram-node-lib');
Instagram.set('client_id', apiconfig.instagram.client_id);
Instagram.set('client_secret', apiconfig.instagram.client_secret);
Instagram.set('callback_url', 'callback');

Instagram.tags.recent({
    name: apiconfig.search,
    complete: function (result) {
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
                    message_meta: {
                        user: {
                            user_id: data[i].user.id,
                            user_username: data[i].user.username,
                            user_full_name: data[i].user.full_name
                        },
                        media: {
                            media_images: data[i].images
                        },
                        link: data[i].link
                    }
                };

                process.emit('smData', msg);
            }
        }
    },
    error: function (error) {
        process.emit('smError', {source: 'instagram', error: error});
    }
});