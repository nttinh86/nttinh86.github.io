var ownerVideoStatusState = (state=true, action) => {
    switch(action.type) {
        case 'OWNER_VIDEO_STATUS':
            return !state;
        default:
            return state;
    }
};

export default ownerVideoStatusState;