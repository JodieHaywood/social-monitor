if (global.acquisitionSocket) {
    global.acquisitionSocket.on('update', function (data) {
        if (global.socket) {
            global.socket.emit('update', data);
        }
    });
}