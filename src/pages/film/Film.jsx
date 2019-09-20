import React, { Component } from 'react';

import { Route, Redirect, Switch, withRouter } from 'react-router-dom';

import Nowplaying from "./component/Nowplaying";
import Comingsoon from "./component/ComingSoon"
import ComponentButtom from "../../component/ComponentButtom/ComponentButtom"

import { Carousel, Button, Menu, Icon, Affix } from 'antd';

//引入样式
import './film.css'

class Home extends Component {
    state = {
        current: "mail",
        visible: false
    }
    componentDidMount() {
        let data = this.props.location.pathname

        if (data == '/film') {
            data = "/film/nowplaying"
        }

        this.setState({
            current: data
        });
        this.goto(data)
    }
    //控制路由跳转
    goto = (path) => {
        this.props.history.push(path)
    }
    handleClick = (e) => {
        let { key } = e
        this.setState({
            current: key
        })
        this.goto(key)
    }
    //控制吸顶效果
    hide = (affixed) => {
        this.setState({
            visible: affixed
        })

    }
    render() {
        let data = this.props

        return (
            <>
                <div className="film"
                    ref={node => {
                        this.container = node;
                    }}
                >
                    <div className="f_fixed">
                        <p>广州</p>
                        <Icon type="down" style={{ fontSize: 5 }}></Icon>
                    </div>
                    <Affix
                        offsetTop={0}
                        target={() => this.container}
                        className="f_header"

                        style={{ display: this.state.visible ? "block" : "none" }}
                    >
                        <div className="left">
                            <p>广州</p>
                            <Icon type="down" style={{ fontSize: 5 }}></Icon>
                        </div>
                        <div className='center'>电影</div>
                        <div className='right'></div>
                    </Affix>
                    <Carousel autoplay>
                        <div>
                            <img src={"../../asset/img/lunbo2.jpg"} alt="" style={{ width: 414, height: 231 }} />
                        </div>
                        <div>
                            <img src={"../../asset/img/lunbo1.jpg"} alt="" style={{ width: 414, height: 231 }} />
                        </div>
                    </Carousel>

                    <Affix
                        offsetTop={44}
                        onChange={this.hide}
                        target={() => this.container}
                    >
                        <div>
                            <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                                <Menu.Item key={"/film/nowplaying"}>
                                    正在热映
                            </Menu.Item>
                                <Menu.Item key={"/film/comingsoon"}>
                                    即将上映
                            </Menu.Item>
                            </Menu>
                        </div>

                    </Affix>

                    <div>
                        <Switch>
                            <Route path="/film/nowplaying" component={Nowplaying} />
                            <Route path="/film/comingsoon" component={Comingsoon} />
                        </Switch>
                    </div>
                    <ComponentButtom />
                </div>

            </>
        )
    }
}

Home = withRouter(Home);

export default Home;