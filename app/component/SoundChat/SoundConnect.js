import React from 'react';
import {connect} from 'react-redux';

class SoundConnect extends  React.Component
{
    constructor(props)
    {
        super(props);
    }

    connectedStatus() {
        return this.props.soundConnectingStatus == 'connected' ? true : false;
    }


    render()
    {
        if (this.connectedStatus()) {
            return (
                <div className="wait-connect">
                    <div className="logo"></div>
                    <div className="name">Nguyễn Tính</div>
                    <div className="calling">00:00</div>
                </div>
            );
        } else {
            return (
                <div className="wait-connect">
                    <div className="logo"></div>
                    <div className="name">Nguyễn Tính</div>
                    <div className="calling">Đang gọi...</div>
                </div>
            );
        }
    }
}

export default connect(function(state){
    return {soundConnectingStatus: state.soundConnectingStatus}
})(SoundConnect);