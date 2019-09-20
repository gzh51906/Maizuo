// Reducer
// 初始state
let defaultState = {
    cinemalist: [],
    orderlist: []

}

function reducer(state = defaultState, action) {
    // console.log(action)
    switch (action.type) {
        case 'add_cinema':

            return {
                ...state,
                cinemalist: [...action.cinemalist, ...state.cinemalist]
            }
        case 'up_cinema':
            return {
                ...state,
                cinemalist: [...state.cinemalist, ...action.data]
            }
        case 'get_order':
            // console.log(action)
            return {
                ...state,
                orderlist: [...state.orderlist, ...action.orderlist]
            }
        case 'add_order':
            // console.log(action)
            return {
                ...state,
                orderlist: [...state.orderlist, ...action.order.order]
            }
        case 'get_address':
            console.log(action)
            return {
                ...state,
                cinemalist: [...action.data]
            }
        // 当所有跳转不满足时，返回初始state
        default:
            return state;
    }
}

export default reducer;