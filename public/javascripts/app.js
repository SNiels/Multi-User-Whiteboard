(function (){
    var whiteboard = new Whiteboard(),
        socket = io.connect(window.location.host+"/whiteboard")
    whiteboard.onDraw(function (x, y, type, color) { 
        socket.emit('draw', { x: x, y: y, type: type, color: color });
    });
    socket.on('draw', function (d) {
        whiteboard.draw(d.x, d.y, d.type, d.color);
    });
})();