var myIceServers;

$( document ).ready( function () {
    $.ajax ({
        url: "https://global.xirsys.net/_turn/nttinh86.github.io/",
        type: "PUT",
        async: false,
        headers: {
            "Authorization": "Basic " + btoa("nttinh86:156d7bc6-27f7-11e8-b1b7-9a80c18987a0")
        },
        success: function (res){
            console.log(res.v.iceServers);
            myIceServers = res.v.iceServers;
        }
    });
});

// Socket.io
var socket = io.connect('https://nttinh86nodejs.herokuapp.com');

function clientSendPeerId(peerId) {
    socket.emit('client-send-peer-id', {peerId: peerId});
}

socket.on('server-send-user-online', function(data) {
    console.log(data);
    $('#userOnline').html('');
    data.userOnline.map(function(val){
        $('#userOnline').append(`<li id="${val}">${val}</li>`);
    });
    call();
});


// Display video
getUserMedia({videoTag: '#my-stream', volume: 0}, '#errorMsg');

// var peer = new Peer({key: 'n75dq11v0jk2zkt9'});
var peer = new Peer({
    host: 'nttinh86peerserver.herokuapp.com',
    secure: true,
    port: 443,
    key: 'peerjs',
    debug: 3,
    config: myIceServers
});

// Create peer
peer.on("open", peerId => {
    $("#my-peer-id").html('My ID: ' + peerId);
    // Send peer id o server
    clientSendPeerId(peerId);
    console.log(peerId);
});





function call() {
    $("#userOnline li").on('click', function(){
        $('#other-stream').show();
        // Caller
        var orderPeerId = $(this).attr('id');
        // Get stream
        getUserMedia({videoTag: "#my-stream", volume: 0}, '#errorMsg', function (stream) {
            // Call a peer, providing our mediaStream
            let call = peer.call(orderPeerId, stream);
            call.on('stream', function(remoteStream) {
                let video = document.querySelector('#other-stream');
                video.srcObject = remoteStream;
            });
        });

        return false;
    });
}


// Answer
peer.on('call', function(call) {
    $('#other-stream').show();
    // Get stream
    getUserMedia({videoTag: "#my-stream", volume: 0}, '#errorMsg', function(stream) {
        call.answer(stream);
        call.on('stream', function(remoteStream){
            var video = document.querySelector('#other-stream');
            video.srcObject = remoteStream;
        });
    });
});




