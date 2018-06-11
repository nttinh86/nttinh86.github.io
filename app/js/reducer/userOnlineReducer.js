var userOnlineState = (state = [], action) => {
    switch (action.type) {
        case 'ADD_USER_ONLINE':
            return [...state, action.user];
        case 'REMOVE_USER_ONLINE':
            return state.filter((val) => val.id !== action.id);
        case 'UPDATE_USER_ONLINE':
            return state.map((user) => {
                if (user.id === action.user.id) return {...user, ...action.user};
                return user;
            });
        default:
            return state;
    }
};

export default userOnlineState;