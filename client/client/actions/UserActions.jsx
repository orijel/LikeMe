export const ACTION = {
    LOGIN_WITH_USER: 'LOGIN_WITH_USER',
    CHANGE_VIEW_USER: 'CHANGE_VIEW_USER',
    UPDATE_LIKES: 'UPDATE_LIKES'
}

export const loginWithUser = (userId, userName, userPicture) => ({
    type: ACTION.LOGIN_WITH_USER,
    userId,
    userName,
    userPicture
});

export const changeViewUser = (userId) => ({
    type: ACTION.CHANGE_VIEW_USER,
    userId
});

export const updateLikes = () => ({
    type: ACTION.UPDATE_LIKES
});
