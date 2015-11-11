for (var i = 0, len = global.apiconfig.subscriptions; i < len; i++) {
    global.acquisitionSocket.on('update', function (data) {
        if (global.socket) {
            global.socket.emit('update', data);
        }
    });
}