import React, { Component } from 'react';

import { Route, Redirect, Switch, withRouter } from 'react-router-dom';

import { Menu, Icon, Layout } from 'antd';
const { Footer, Content } = Layout;

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

import "./style/common.css"


class App extends Component {
    state = {

    }
    componentDidMount() {
        let data = this.props
        console.log(data);

    }

    render() {
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
                            <Route path="/mine" component={Mine} exact />
                            {/* 资讯 */}
                            <Route path="/information" component={Information} />
                            {/* 电影详情页 */}
                            <Route path="/filmdetail/:id" component={FilmDetail} />
                            {/* 设置 */}
                            <Route path="/setting" component={Setting} />
                            {/* 订单页 */}
                            <Route path="/user/order" component={Order} />
                            {/* 设置 */}
                            <Route path="/user" component={User} />

                            {/* 电影院详情 */}
                            <Route path="/cinemadetail/:id" component={Cinemadetail} />
                            {/* 选座页面 */}
                            <Route path="/schedule/:id" component={Schedule} />
                            {/* 登陆注册 */}
                            {/* <Route path="/login" component={Login} /> */}
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

// let mapStateToProps = (state) => {
//     return {
//         cartlength: state.cart.goodslist.length
//     }
// }


// App = connect(mapStateToProps)(App);

export default App;