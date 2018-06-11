var videoConnectingStatusAction  = function VideoConnectingStatusAction(status) {
    return {
        type: 'VIDEO_CONNECTING_STATUS',
        status
    }
};

export default videoConnectingStatusAction;