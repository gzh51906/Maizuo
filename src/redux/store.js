import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducer';
import createSagaMiddleware from 'redux-saga';

// 引入调试工具模块
import { composeWithDevTools } from "redux-devtools-extension";

//3.引入自定义saga配置文件
import rootSage from './rootSage.js';

//1.创建中间件
const sagaMiddleware = createSagaMiddleware();

//2.将 中间件 连接至 store
let enhancer = applyMiddleware(sagaMiddleware);


enhancer = compose(enhancer, composeWithDevTools())
const store = createStore(rootReducer, enhancer);

//4.运行Saga配置
sagaMiddleware.run(rootSage);

export default store;