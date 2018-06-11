import React from 'react';
import {connect} from 'react-redux';

class VideoConnect extends  React.Component
{
    constructor(props)
    {
        super(props);
    }

    componentDidUpdate() {
        if (this.props.videoConnectingStatus === 'connected') {
            const remoteStream = document.getElementById('remote-stream');
            remoteStream.srcObject = this.props.remoteStream;
            remoteStream.play();
        }
    }

    render()
    {
        switch (this.props.videoConnectingStatus) {
            case 'connecting':
                return (
                    <div className="wait-connect">
                        <div className="logo"></div>
                        <div className="name">{this.props.user.name}</div>
                        <div className="calling">Đang kết nối...</div>
                    </div>
                );
            case 'cancel-connection':
                return (
                    <div className="wait-connect">
                        <div className="logo"></div>
                        <div className="name">{this.props.user.name}</div>
                        <div className="calling">Kết nối thất bại</div>
                    </div>
                );
            case 'connected':
                return (
                    <div className="remote-stream">
                        <video id="remote-stream"></video>
                    </div>
                );
            default: // not-connection
                return (
                    <div className="wait-connect">
                        <div className="logo"></div>
                        <div className="name">Xin chọn nhân viên</div>
                        <div className="calling">Xem danh sách bên phải ...</div>
                    </div>
                );
        }
    }
}

export default connect(function(state){
    return {videoConnectingStatus: state.videoConnectingStatus}
})(VideoConnect);