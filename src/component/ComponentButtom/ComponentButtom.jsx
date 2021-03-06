import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';

import { Menu, Icon } from "antd";

import "./ComponentButtom.css";

class ComponentButtom extends Component {
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

        if (data == '/') {
            data = "/film"
        }

        this.setState({
            current: data
        });
    }
    goto = (path) => {
        console.log(path, 222222);
        this.props.history.push(path)
    }
    changeMenu = ({ key }, e) => {
        this.setState({
            current: key
        });
        this.goto(key)
    }
    componentWillUnmount() {
        // 卸载异步操作设置状态
        this.setState = (state, callback) => {
            return;
        }
    }
    render() {
        return (
            <div className="footer">
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
            </div>

        )
    }
}

ComponentButtom = withRouter(ComponentButtom);
export default ComponentButtom;