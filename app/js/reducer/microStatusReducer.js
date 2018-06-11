var microStatusState = (state = true, action) => {
    switch (action.type) {
        case 'MICRO_TOGGLE_STATUS':
            return !state;
        default:
            return state;
    }
};

export default microStatusState;