$(document).ready(function() {
    if ("WebSocket" in window) {
        ws = new WebSocket("ws://" + document.domain + ":8000/websocket");
        ws.onmessage = function(msg) {
            var message = JSON.parse(msg.data);
            $("p#log").html(message.output);
            $.notify({
                icon: 'fa fa-star',
                message: message.output,
                animate: {
                    enter: 'fadeInRight animated',
                    exit: 'fadeOutRight animated'
                },
                type: 'default'
            });
        };

        $('#msg').on('submit', function(e) {
            e.preventDefault();
            console.log($('#say').val());
            ws.send(JSON.stringify({
                'text': $('#say').val()
            }));
        });

        // Cleanly close websocket when unload window
        window.onbeforeunload = function() {
            ws.onclose = function() {}; // disable onclose handler first
            ws.close()
        };
    };
});