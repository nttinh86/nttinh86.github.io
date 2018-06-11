var videoConnectingStatus = (state = 'not-connection', action) => {
    switch (action.type) {
        case 'VIDEO_CONNECTING_STATUS':
            return action.status;
        default:
            return state;
    }
};

export default videoConnectingStatus;