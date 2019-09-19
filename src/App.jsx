import React, { Component } from 'react';

import { Route, Redirect, Switch, withRouter } from 'react-router-dom';

import { Menu, Icon, Layout } from 'antd';
const { Footer, Content } = Layout;

import { connect } from 'react-redux';

import Film from '~/film/Film';
import Mine from '~/mine/Mine';
import Cinema from '~/cinema/Cinema';
import Information from '~/information/Information';

import "./style/common.css"
import { log } from 'util';

class App extends Component {
    state = {
        current: '/film',
        menu: [{
            path: '/film',
            text: '电影',
            icon: 'pie-chart',
            name: 'film'
        }, {
            path: '/cinema',
            text: '电影院',
            icon: 'youtube',
            name: 'Cinema'
        }, {
            path: '/information',
            text: '资讯',
            icon: 'mail',
            name: 'Information'
        }, {
            path: '/mine',
            text: '我的',
            icon: 'user',
            name: 'mine'
        }]
    }
    componentDidMount() {
        let data = this.props.location.pathname
        this.setState({
            current: data
        });
    }
    goto = (path) => {
        this.props.history.push(path)
    }
    changeMenu = ({ key }) => {
        this.setState({
            current: key
        });
        this.goto(key)
    }
    render() {
        return (
            <div className="index">
                <Layout>
                    <Content>

                        <Switch>
                            {/* 电影 */}
                            <Route path="/film" component={Film} />
                            {/* 电影院 */}
                            <Route path="/cinema" component={Cinema} />
                            {/* 我的 */}
                            <Route path="/mine" component={Mine} />
                            {/* 资讯 */}
                            <Route path="/information" component={Information} />

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
                    <Footer>
                        <Menu
                            onClick={this.changeMenu}
                            selectedKeys={[this.state.current]}
                            mode="horizontal">
                            {
                                this.state.menu.map(item => {
                                    return <Menu.Item key={item.path}>
                                        <Icon type={item.icon} />
                                        <p>{item.text}</p>
                                    </Menu.Item>
                                })
                            }
                        </Menu>
                    </Footer>
                </Layout>
            </div>
        )
    }
}

App = withRouter(App);//返回一个新的组件 

let mapStateToProps = (state) => {
    return {
        cartlength: state.cart.goodslist.length
    }
}

App = connect(mapStateToProps)(App);

export default App;