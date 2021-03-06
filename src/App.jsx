import React, { Component } from 'react';

import { Route, Redirect, Switch, withRouter } from 'react-router-dom';

import { Menu, Icon, Layout } from 'antd';
const { Footer, Content } = Layout;

import { connect } from 'react-redux'

// import { connect } from 'react-redux';



import Film from '~/film/Film';
import Mine from '~/mine/Mine';
import Cinema from '~/cinema/Cinema';
import Information from '~/information/Information';
import FilmDetail from '~/filmDetail/filmDetail';
import Setting from '~/user/Setting';
import User from '~/user/User';
import Order from '~/user/component/order';
import Cinemadetail from './pages/cinemadetail/Cinemadetail'
import Schedule from './pages/schedule/Schedule'
import Login from './pages/login/Login'
import Orderlist from './pages/orderlist/Orderlist'

import "./style/common.css"


class App extends Component {
    state = {

    }
    componentDidMount() {
        // let data = this.props
        // console.log(data);

    }


    render() {
        // console.log(this.props.location.pathname, 111111111);
        let { isLogin } = this.props;
        console.log(isLogin);

        return (
            <div className="index">
                <Layout style={{ width: '100%' }}>
                    <Content>

                        <Switch>
                            {/* 电影 */}
                            <Route path="/film" component={Film} />
                            {/* 电影院 */}
                            <Route path="/cinema" component={Cinema} />
                            {/* 我的 */}
                            <Route path="/mine" component={() => {
                                return isLogin ? <Mine history={this.props.history} /> : <Redirect to={{ pathname: "/login", state: { pathname: '/mine' } }} />
                            }} />
                            {/* <Route path="/mine" component={Mine} /> */}
                            {/* 资讯 */}
                            <Route path="/information" component={Information} />
                            {/* 电影详情页 */}
                            <Route path="/filmdetail/:id" component={FilmDetail} />
                            {/* 设置 */}
                            {/* <Route path="/setting" component={Setting} /> */}
                            <Route path="/setting" component={() => {
                                return isLogin ? <Setting history={this.props.history} /> : <Redirect to={{ pathname: "/login" }} />
                            }} />
                            {/* 订单页 */}
                            <Route path="/user/order" component={Order} />
                            {/* 设置 */}
                            <Route path="/user" component={User} />

                            {/* 电影院详情 */}
                            <Route path="/cinemadetail/:id" component={Cinemadetail} />
                            {/* 选座页面 */}
                            <Route path="/schedule/:id" component={(h) => {
                                // console.log("黎文德", h)
                                return isLogin ? <Schedule {...h} /> : <Redirect to={{ pathname: "/login" }} />
                            }} />
                            {/* 订单列表 */}
                            <Route path="/orderlist/:id" component={Orderlist} />
                            {/* 登陆注册 */}
                            <Route path="/login" component={Login} />
                            {/* <Route path="/reg" component={Reg} /> */}

                            {/* 动态路由 */}
                            {/* <Route path="/goods/:id" component={Goods} /> */}

                            {/* 嵌套路由 */}
                            {/* <Route path="/discover" component={Discover} /> */}

                            <Route path="/notfound" render={() => <div>404</div>} />
                            <Redirect from="/" to="/film" exact />
                            {/* 404 一定要写在最后面*/}
                            <Redirect from="*" to="/notfound" />
                        </Switch>
                    </Content>
                </Layout>
            </div>
        )
    }
}

App = withRouter(App);//返回一个新的组件 

let mapStateToProps = (state) => {
    return {
        isLogin: state.user.isLogin
    }
}


App = connect(mapStateToProps)(App);

export default App;