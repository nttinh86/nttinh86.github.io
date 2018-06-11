import React from "react";
const {connect} = require('react-redux');
import RightSide from './RightSide.js';
import Footer from './Footer.js';
import VideoConnect from './VideoConnect.js';
import {getUserMediaOnly} from 'getUserMedia';
import myPeer from 'myPeer';
import videoConnectingStatusAction from 'videoConnectingStatusAction';
import {onlineListDisplayAction} from "onlineListDisplayAction";
import {updateUserOnline} from "userOnlineAction";

class VideoChat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stream: null,
            call: ()=>{},
            peer: null,
            toggleStreamVideo: ()=>{},
            toggleStreamAudio: ()=>{},
            remoteStream: null,
            user: null
        };
        this.dataConnectInfo = null;
    }

    componentWillMount() {
        // Open camera
        getUserMediaOnly((stream) => {
            this.setState({stream : stream});
            this.listenCall();
            this.setState({call: this.call.bind(this)});
        });
    }

    call(user) {
        const {dispatch} = this.props;
        dispatch(videoConnectingStatusAction('connecting'));
        this.setState({user: user});

        console.log('check stream' + this.state.stream);
        const peerOffer = myPeer(this.state.stream, true);
        this.setState({peer: peerOffer});

        this.props.socket.on('server-send-call-answer', (data) => {
            console.log('dataSignalAnswer');
            console.log(data);
            if (data.response.answer === 'yes') {
                this.state.peer.signal(data.dataSignalAnswer);
                this.dataConnectInfo = {
                    callingUser: data.callingUser,
                    listeningUser: data.listeningUser
                };
            }
            else {
                const {dispatch} = this.props;
                dispatch(videoConnectingStatusAction('cancel-connection'));
                dispatch(onlineListDisplayAction(true));
            }
            this.props.socket.removeListener('server-send-call-answer');
        });

        peerOffer.on('signal', (dataSignalOffer) => {
            console.log('dataSignalOffer');
            console.log(dataSignalOffer);
            if (typeof(dataSignalOffer.type) !== 'undefined') {
                this.props.socket.emit('client-send-call-request', {
                    listeningUser: user,
                    dataSignalOffer: dataSignalOffer
                });
            }
        });

        peerOffer.on('connect', () => {
            console.log('offer connect --------------------------');
            this.setState({
                toggleStreamVideo: this.toggleStreamVideo.bind(this),
                toggleStreamAudio: this.toggleStreamAudio.bind(this)
            });
            const {dispatch} = this.props;
            dispatch(videoConnectingStatusAction('connected'));
            dispatch(onlineListDisplayAction(false));

            this.dataConnectInfo.listeningUser.status = 'disable';
            this.dataConnectInfo.callingUser.status = 'disable';
            this.props.socket.emit('client-send-update-status-user', this.dataConnectInfo);
        });

        peerOffer.on('stream', (remoteStream) => {
            this.setState({remoteStream: remoteStream});
        });

        peerOffer.on('close', () => {
            const {dispatch} = this.props;
            dispatch(videoConnectingStatusAction('not-connection'));
            dispatch(onlineListDisplayAction(true));

            this.dataConnectInfo.listeningUser.status = 'enable';
            this.dataConnectInfo.callingUser.status = 'enable';
            this.props.socket.emit('client-send-update-status-user', this.dataConnectInfo);
        });
    }

    listenCall() {
        this.props.socket.on('server-send-call-request', (dataOffer) => {
            // Check status
            if (this.props.videoConnectingStatus === 'connected') {
                this.props.socket.emit('client-send-answer-call', {
                    response: {answer: 'no', result: 'Máy bận'},
                    callingUser: dataOffer.callingUser
                });
                return;
            }

            this.setState({user: dataOffer.callingUser});
            const {dispatch} = this.props;
            dispatch(videoConnectingStatusAction('connecting'));

            // Confirm
            const myConfirm = confirm(dataOffer.callingUser.name + 'đang gọi ...');
            // Answer yes
            if (myConfirm) return this.answer(dataOffer);
            // Answer no
            dispatch(videoConnectingStatusAction('cancel-connection'));
            dispatch(onlineListDisplayAction(true));
            this.props.socket.emit('client-send-answer-call', {
                response: {answer: 'no', result: 'User cancel!'},
                callingUser: dataOffer.callingUser
            });
        });

        this.props.socket.on('server-send-update-user-online', (user) => {
            console.log('updateuser', user);
            const {dispatch} = this.props;
            dispatch(updateUserOnline(user));
        });
    }

    answer(dataOffer) {

            const peerAnswer = myPeer(this.state.stream, false);
            this.setState({peer: peerAnswer});
            this.setState({
                toggleStreamVideo: this.toggleStreamVideo.bind(this),
                toggleStreamAudio: this.toggleStreamAudio.bind(this)
            });
            peerAnswer.on('signal', (dataAnswer) => {
                console.log('dataAnswer');
                console.log(dataAnswer);
                if(typeof(dataAnswer.type) !== 'undefined') {
                    console.log('123');
                    this.props.socket.emit('client-send-answer-call', {
                        response: {answer: 'yes', result: null},
                        callingUser: dataOffer.callingUser,
                        listeningUser: dataOffer.listeningUser,
                        dataSignalAnswer: dataAnswer
                    });
                }

            });

            peerAnswer.on('connect', () => {
                console.log('answer connect ------------------------');
                const {dispatch} = this.props;
                dispatch(videoConnectingStatusAction('connected'));
                dispatch(onlineListDisplayAction(false));
            });

            peerAnswer.on('stream', (remoteStream) => {
                this.setState({remoteStream: remoteStream});
                // console.log(stream);
            });

            peerAnswer.on('close', () => {
                const {dispatch} = this.props;
                dispatch(videoConnectingStatusAction('not-connection'));
                dispatch(onlineListDisplayAction(true));

                this.dataConnectInfo.listeningUser.status = 'enable';
                this.dataConnectInfo.callingUser.status = 'enable';
                this.props.socket.emit('client-send-update-status-user', this.dataConnectInfo);

            });

            peerAnswer.signal(dataOffer.dataSignalOffer);

    }

    toggleStreamVideo(status) {
        if (status) return this.state.stream.getVideoTracks()[0].enabled = false;
        this.state.stream.getVideoTracks()[0].enabled = true;
    }

    toggleStreamAudio(status) {
        if (status) return this.state.stream.getAudioTracks()[0].enabled = false;
        this.state.stream.getAudioTracks()[0].enabled = true;
    }

    render() {
        return (
            <div>
                <RightSide socket={this.props.socket} call={this.state.call} stream={this.state.stream} />
                <VideoConnect remoteStream={this.state.remoteStream} user={this.state.user} />
                <Footer
                    stream={this.state.stream}
                    peer={this.state.peer}
                    toggleStreamVideo={this.state.toggleStreamVideo}
                    toggleStreamAudio={this.state.toggleStreamAudio}
                />
            </div>
        );
    }
}

export default connect(function(state) {
    return {
        videoConnectingStatus: state.videoConnectingStatus,
        userOnlineState: state.userOnlineState
    }
})(VideoChat);