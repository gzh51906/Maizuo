const isLogin = Boolean(window.localStorage.getItem('authorization'))

const userInfo = JSON.parse(window.localStorage.getItem('userInfo'));

let initState = {
    ...userInfo,
    isLogin,
    isLoading: false
}

function reducer(state = initState, action) {

    switch (action.type) {
        case 'start_login':

            return {
                ...state,
                isLoading: true
            }
        case 'login_success':

            return {
                ...state,
                isLoading: false,
                isLogin: true
            }
        case 'login_failed':
            return {
                id: '',
                nickname: '',
                avatar: '',
                isLogin: false,
                isLoading: false,
                orderlist: ''
            }
        default:
            return state;
    }
}

export default reducer;