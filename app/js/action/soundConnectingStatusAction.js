var soundConnectingStatusAction  = function SoundConnectingStatusAction(status) {
    return {
        type: 'SOUND_CONNECTING_STATUS',
        status
    }
};

export default soundConnectingStatusAction;