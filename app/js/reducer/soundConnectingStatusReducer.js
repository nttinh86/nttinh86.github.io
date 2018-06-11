var soundConnectingStatusReducer = (state = '', action) => {
    switch (action.type) {
        case 'SOUND_CONNECTING_STATUS':
            return action.status;
        default:
            return state;
    }
};

export default soundConnectingStatusReducer;