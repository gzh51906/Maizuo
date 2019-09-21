import { call, apply, put, takeEvery, takeLatest, delay } from 'redux-saga/effects';

import Api from '@/api';


function* getKucun({ goods_id, qty }) {
    //这里自动传进来的参数是action，然后进行解构
    const data = yield call(Api.getKucun);

    yield put(changeQty(goods_id, qty))
}

function* getcinema({ cinemalist }) {


    yield put({ type: 'add_cinema', cinemalist })
}
// 增加电影院
function* addcinema({ limit, skip }) {

    const { data } = yield call(Api.cinema.bind(null, limit, skip));

    yield put({ type: 'up_cinema', data })
}

function* getorder({ orderlist }) {
    // console.log("orderlist", orderlist)

    yield put({ type: 'get_order', orderlist })
}
function* addorder(order) {

    yield put({ type: 'add_order', order })
}
function* address({ address }) {

    console.log(address)
    const { data } = yield call(Api.addresscinema.bind(null, address));
    console.log(data)
    yield put({ type: 'get_address', data })
}
function* rootSaga() {
    yield takeLatest("CHANGE_QTY_ASYNC", getKucun)
    yield takeLatest("GET_CINEMA", getcinema)
    yield takeLatest("ADD_CINEMA", addcinema)
    yield takeLatest("GET_RODER", getorder)
    yield takeLatest("ADD_RODER", addorder)
    yield takeLatest("GET_ADDRESS", address)

}

export default rootSaga;