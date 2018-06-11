const onlineListDisplayState = (state = false, action) => {
    switch (action.type) {
        case 'ONLINE_LIST_DISPLAY':
            return action.status;
        default:
            return state;
    }
};

export default onlineListDisplayState;