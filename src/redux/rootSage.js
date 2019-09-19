import { call, apply, put, takeEvery, takeLatest, delay } from 'redux-saga/effects';

import Api from '@/api';

function* helloSaga() {
    yield console.log('hello saga')
}

function* getKucun({ goods_id, qty }) {
    //这里自动传进来的参数是action，然后进行解构
    const data = yield call(Api.getKucun);

    yield put(changeQty(goods_id, qty))
}

function* rootSaga() {
    yield takeLatest("CHANGE_QTY_ASYNC", getKucun)

}

export default rootSaga;