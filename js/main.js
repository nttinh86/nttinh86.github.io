// Call Xirsys server
var myIceServers;
var socket;
var peer;

function iceServer()
{
    var def = $.Deferred();
    myIceServers = [
        {
            url: "stun:139.162.58.82:3478?transport=tcp"
        },
        {
            url: "turn:139.162.58.82:3478?transport=tcp",
            username: "nttinh86",
            credential: "8ik,&UJM"
        }
    ];
    def.resolve(myIceServers);
    return def.promise();
}

function clickToCall()
{
    $("#userOnline li").on('click', function(){
        console.log('click');
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

// $.ajax ({
//     url: "https://global.xirsys.net/_turn/nttinh86.github.io/",
//     type: "PUT",
//     async: false,
//     headers: {
//         "Authorization": "Basic " + btoa("nttinh86:156d7bc6-27f7-11e8-b1b7-9a80c18987a0")
//     }
// })

iceServer().then(function(myIceServers){
    console.log(myIceServers);

    // Socket.io
    socket = io.connect('https://nttinh86nodejs.herokuapp.com');

    // Create peer
    // peer = new Peer({
    //     host: 'nttinh86peerserver.herokuapp.com',
    //     secure: true,
    //     port: 443,
    //     key: 'peerjs',
    //     debug: 3,
    //     config: {iceServers: myIceServers}
    // });

    peer = new Peer({
        host: 'nttinh86peerserver.herokuapp.com',
        path: '/peerjs-server',
        secure: true,
        port: 4443,
        key: 'peerjs',
        debug: 3,
        config: {iceServers: myIceServers}
    });

    peer.on("open", peerId => {
        $("#my-peer-id").html('My ID: ' + peerId);
        // Send peer id o server
        socket.emit('client-send-peer-id', {peerId: peerId});
    });

    var def = $.Deferred();
    socket.on('server-send-user-online', function(data) {
        $('#userOnline').html('');
        data.userOnline.map(function(val){
            $('#userOnline').append(`<li id="${val}">${val}</li>`);
        });
        clickToCall();
        def.resolve();
    });
    return def.promise();

}).then(function() {
    // Display video
    getUserMedia({videoTag: '#my-stream', volume: 0}, '#errorMsg');

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

});
