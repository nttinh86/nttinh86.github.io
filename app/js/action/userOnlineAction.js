function addUserOnline(user) {
    return {
        type: 'ADD_USER_ONLINE',
        user
    };
}

function removeUserOnline(id) {
    return {
        type: 'REMOVE_USER_ONLINE',
        id
    }
}

function updateUserOnline(user) {
    return {
        type: 'UPDATE_USER_ONLINE',
        user
    }
}

export {
    addUserOnline,
    removeUserOnline,
    updateUserOnline
};