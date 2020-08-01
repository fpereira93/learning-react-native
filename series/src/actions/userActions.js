import services from '../services/firebase';

export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
const userLoginSuccess = user => ({
    type: USER_LOGIN_SUCCESS,
    user
})

export const USER_LOGOUT = 'USER_LOGOUT';
const userLogout = () => ({
    type: USER_LOGOUT
})

export const tryLogin = ({email, password}) => (dispatch, getState) => {
    return (
        services.auth(email, password)
            .then(user => {
                const action = userLoginSuccess(user);
                dispatch(action);
            })
    )
}