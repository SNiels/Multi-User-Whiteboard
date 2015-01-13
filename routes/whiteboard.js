module.exports = function (app, io) {
    app.get('/', function (req, res) {
        res.redirect('/whiteboard');
    });
    app.get('/whiteboard', function (req, res) {
        res.render('whiteboard');
    });
    var whiteboardIO = io.of('whiteboard');
    whiteboardIO.on('connection', function (socket) {
        console.log("Client connected");
        socket.on('disconnect', function () {
            onDisconnect(socket);
        });
        socket.on('draw', function (data) {
            socket.broadcast.emit('draw',data);
        });
    });
}
function onDisconnect(socket) {
    console.log("Client disconnected");
}