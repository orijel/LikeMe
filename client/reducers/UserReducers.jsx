import { ACTION } from '../actions/UserActions.jsx'

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case ACTION.LOGIN_WITH_USER:
            return {
                loggedInUser: {
                    userId: action.userId,
                    userName: action.userName,
                    userPicture: action.userPicture
                },
                viewUserId: action.userId
            }
        case ACTION.CHANGE_VIEW_USER:
            return {
                loggedInUser: state.loggedInUser,
                viewUserId: action.userId
            }
        default:
            return state
    }
}

export default userReducer