/*
 *  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */

'use strict';

function getUserMediaAndShow(data, callback=null) {

    // var errorElement = document.querySelector(errorMsgTag);
    var video = document.querySelector(data.videoTag);

// Put variables in global scope to make them available to the browser console.
    var constraints = window.constraints = {
        audio: true,
        video: true
    };

    function handleSuccess(stream) {
        var videoTracks = stream.getVideoTracks();
        console.log('Got stream with constraints:', constraints);
        console.log('Using video device: ' + videoTracks[0].label);
        stream.oninactive = function () {
            console.log('Stream inactive');
        };
        window.stream = stream; // make variable available to browser console
        video.srcObject = stream;
        video.volume = data.volume;
        video.onloadedmetadata = function(e) {
            video.play();
            if (callback) callback(stream);
        }
    }

    function handleError(error) {
        if (error.name === 'ConstraintNotSatisfiedError') {
            errorMsg('The resolution ' + constraints.video.width.exact + 'x' +
                constraints.video.width.exact + ' px is not supported by your device.');
        } else if (error.name === 'PermissionDeniedError') {
            errorMsg('Permissions have not been granted to use your camera and ' +
                'microphone, you need to allow the page access to your devices in ' +
                'order for the demo to work.');
        }
        errorMsg('getUserMedia error: ' + error.name, error);
    }

    function errorMsg(msg, error) {
        // errorElement.innerHTML += '<p>' + msg + '</p>';
        console.log('------Start--------');
        console.log(msg);
        if (typeof error !== 'undefined') {
            console.error(error);
        }
        console.log('------End--------');
    }

    navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);
}

function getUserMediaOnly(callback) {

    var constraints = window.constraints = {
        audio: true,
        video: true
    };

    function handleSuccess(stream) {
        var videoTracks = stream.getVideoTracks();
        // console.log('Got stream with constraints:', constraints);
        // console.log('Using video device: ' + videoTracks[0].label);
        stream.oninactive = function () {
            console.log('Stream inactive');
        };
        window.stream = stream; // make variable available to browser console
        callback(stream);
    }

    function handleError(error) {
        if (error.name === 'ConstraintNotSatisfiedError') {
            errorMsg('The resolution ' + constraints.video.width.exact + 'x' +
                constraints.video.width.exact + ' px is not supported by your device.');
        } else if (error.name === 'PermissionDeniedError') {
            errorMsg('Permissions have not been granted to use your camera and ' +
                'microphone, you need to allow the page access to your devices in ' +
                'order for the demo to work.');
        }
        errorMsg('getUserMedia error: ' + error.name, error);
    }

    function errorMsg(msg, error) {
        // errorElement.innerHTML += '<p>' + msg + '</p>';
        console.log('------Start--------');
        console.log(msg);
        if (typeof error !== 'undefined') {
            console.error(error);
        }
        console.log('------End--------');
    }
    navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);

}

export {getUserMediaAndShow, getUserMediaOnly};