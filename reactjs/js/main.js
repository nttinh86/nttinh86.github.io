getUserMedia('#my-stream', '#errorMsg');

var peer = new Peer({key: 'n75dq11v0jk2zkt9'});

// Create peer
peer.on("open", id => {
    $("#my-peer-id").html('My ID: ' + id);
    console.log(id);
});

// Caller
$('#other-peer-id').submit(function(){
    var orderPeerId = $(this).find('input[type=text]').val();
    console.log(orderPeerId);
    // Get stream
    getUserMedia('#my-stream', '#errorMsg', function (stream) {
        // Call a peer, providing our mediaStream
        var call = peer.call(orderPeerId, stream);
        console.log(call);
        call.on('stream', function(remoteStream) {
            getUserMedia('#other-stream', '#errorMsg');
        });
    });

    return false;
});

// Answer
peer.on('call', function(call) {
    // Get stream
    getUserMedia('#my-stream', '#errorMsg', function(stream) {
        call.answer(stream);
        call.on('stream', function(remoteStream){
            getUserMedia('#other-stream', '#errorMsg');
        });
    });
});
