function Whiteboard() {
    var self = this,
        $canvas = $('#canvas')
        canvas = $canvas[0],
        ctx = canvas.getContext('2d'),
        color = getRandomColor()
        drawListeners=[];
    canvas.height = $(window).height();
    canvas.width=$(window).width();
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;

    $canvas.bind('drag dragstart dragend', function (evt) {
        var offset, type, x, y;

        type = evt.handleObj.type;
        offset = $(this).offset();
        x = event.clientX - offset.left;
        y = event.clientY - offset.top;

        self.draw(x, y, type, color);
        
        for (var i = 0; i < drawListeners.length; i++) {
            var listener = drawListeners[i];
            if ($.isFunction(listener)) {
                listener(x, y, type, color);
            }
        }
    });

    this.draw = function(x, y, type, color) {
        ctx.strokeStyle = color ? color : "#000000";
        switch (type) {
            case "dragstart":
                ctx.beginPath();
                ctx.moveTo(x, y);
                break;
            case "drag":
                ctx.lineTo(x, y);
                ctx.stroke();
                break;
            case "dragend":
                //ctx.closePath();
                break;
        }
    }
    this.onDraw = function (cback) {
        drawListeners.push(cback);
    }
    function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}