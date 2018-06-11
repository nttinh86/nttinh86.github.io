import React from 'react';
var {connect} = require('react-redux');
import {getUserMediaAndShow} from 'getUserMedia';


class OwnerCamera extends React.Component {

    constructor (props) {
        super(props);
    }

    componentDidMount() {
        // getUserMediaAndShow({videoTag: "#owner-stream", volume: 1}, function(){
        //     // this.cameraStatus(this.props.ownerVideoStatusState);
        // }.bind(this));
        this.microStatus(this.props.microStatusState);
    }

    componentDidUpdate() {
        this.microStatus(this.props.microStatusState);
        const ownerStream = document.getElementById('owner-stream');
        ownerStream.srcObject = this.props.stream;
        ownerStream.play();
        // this.cameraStatus(this.props.ownerVideoStatusState);
    }

    // cameraStatus(status) {
    //     var ownerCamera = document.getElementById('owner-stream');
    //     if (status) {
    //         ownerCamera.play();
    //     } else {
    //         ownerCamera.pause();
    //     }
    // }

    microStatus(status) {
        const microStatus = document.getElementById("micro-status");
        const ownerStream = document.getElementById("owner-stream");
        if (status) {
            microStatus.className = "micro-status";
            ownerStream.muted = false;
        } else {
            microStatus.className = "micro-status-off";
            ownerStream.muted = true;
        }
    }

    toggleClose() {
        var ownerCameraClassName = document.getElementById("owner-camera").className;
        if (ownerCameraClassName === 'owner-camera') {
            document.getElementById("owner-camera").className = "owner-camera-close";
        } else {
            document.getElementById("owner-camera").className = "owner-camera";
        }
    }

    render() {
        return (
            <div className="owner-camera" id="owner-camera">
                <div id="micro-status" className="micro-status"></div>
                <i id="owner-stream-right-arrow" className="right-arrow fas fa-chevron-right" onClick={this.toggleClose.bind(this)}></i>
                <i id="owner-stream-left-arrow" className="right-arrow fas fa-chevron-left" onClick={this.toggleClose.bind(this)}></i>
                <video id="owner-stream"></video>
            </div>
        );
    };
}

export default connect(function(state){
    return {
        microStatusState: state.microStatusState,
        // ownerVideoStatusState: state.ownerVideoStatusState
    }
})(OwnerCamera);