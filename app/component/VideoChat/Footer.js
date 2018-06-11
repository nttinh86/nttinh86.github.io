import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import microToggleStatus from '../../js/action/microStatusAction.js';
import ownerVideoStatus from 'ownerVideoStatus';
import videoConnectingStatusAction from "videoConnectingStatusAction";
import {onlineListDisplayAction} from "onlineListDisplayAction";

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.videoTracks = null;
    }

    toggleCameraStatus() {
        var {ownerVideoStatusState, dispatch} = this.props;

        this.props.toggleStreamVideo(ownerVideoStatusState);

        dispatch(ownerVideoStatus(!ownerVideoStatusState));
    }

    toggleMicroStatus() {
        var {dispatch, microStatusState} = this.props;

        this.props.toggleStreamAudio(microStatusState);

        dispatch(microToggleStatus());
    }

    disConnect() {
        if (this.props.videoConnectingStatus === 'connected') {
            this.props.peer.destroy();
            const {dispatch} = this.props;
            dispatch(videoConnectingStatusAction('not-connection'));
            dispatch(onlineListDisplayAction(true));
        }
    }

    render() {
        return (
            <div className="footer">
                <div className={this.props.ownerVideoStatusState === true ? "items camera" : "items camera-off"}
                onClick={this.toggleCameraStatus.bind(this)}></div>
                <div className="items phone" onClick={this.disConnect.bind(this)}></div>
                <div className={this.props.microStatusState === true ? "items microphone" : "items microphone-off"}
                     onClick={this.toggleMicroStatus.bind(this)}></div>
            </div>
        );
    }
}

export default connect(function(state) {
    return {
        ownerVideoStatusState: state.ownerVideoStatusState,
        microStatusState: state.microStatusState,
        videoConnectingStatus: state.videoConnectingStatus
    }
})(Footer);