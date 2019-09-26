import React, { Component } from 'react';

import { Button, Menu, Row, Col } from 'antd';

import { connect } from 'react-redux'

import ComponentButtom from "../../component/ComponentButtom/ComponentButtom"

import './mine.css'

class Mine extends React.Component {
    state = {
        menu: [
            {
                name: "电影订单",
                path: ""
            },
            {
                name: "商品订单",
                path: ""
            }
        ],
        list: [
            {
                name: "卖座券",
                path: "/user/card",
                src: "../../asset/mineimg/maizuo.png"
            },
            {
                name: "组合红包",
                path: "/user/redpacket",
                src: "../../asset/mineimg/hongbao.png"
            },
            {
                name: "余额",
                path: "/user/yue",
                src: "../../asset/mineimg/yue.png"
            },
            {
                name: "设置",
                path: "/setting",
                src: "../../asset/mineimg/setting.png"
            }
        ],
        avatar: "",
        nickname: ""
    };
    componentDidMount() {
        let { nickname, avatar } = JSON.parse(window.localStorage.getItem('userInfo'))
        this.setState({
            avatar,
            nickname
        })
    }
    ligoto = (path, e) => {
        console.log(path);
        console.log(this.props, 123123);
        e.stopPropagation();
        this.props.history.push(path)
    }

    setinfo = () => {
        this.props.history.push('/user');
    }

    render() {
        // let { nickname, avatar } = this.props.logindata
        // console.log(this.props);

        return (
            <div className="mine">
                <Row className='m_header'>
                    <img src={this.state.avatar ? this.state.avatar : "https://mall.s.maizuo.com/4f0b29878f62f5e298a89a4654f0e8f0.jpg"} alt="" onClick={this.setinfo} />
                    <div className="m_h_name" onClick={this.setinfo}>
                        {this.state.nickname}
                    </div>
                </Row>
                <Row className='m_order'>
                    <ul>
                        <li onClick={this.ligoto.bind(this, 'user/order')}>
                            <img src="../../asset/mineimg/下载.png" alt="" />
                            <p>电影订单</p>
                        </li>
                        <li onClick={this.ligoto}>
                            <img src="../../asset/mineimg/下载 (1).png" alt="" />
                            <p>商品订单</p>
                        </li>

                    </ul>
                </Row>
                {
                    this.state.list.map(item => {
                        return (
                            <Row
                                className='m_list'
                                key={item.name}
                                onClick={this.ligoto.bind(null, item.path)}
                            >
                                <img src={item.src} alt="" />
                                <span>{item.name}</span>
                            </Row>
                        )
                    })
                }
                <ComponentButtom />
            </div>
        );
    }
}

let mapStateToProps = function (state) {
    // 需要映射什么到Cart组件的props就return什么出去
    return {
        logindata: state.user,
    }
}

let mapDispatchToProps = function (dispatch) {
    return {
    }
}

Mine = connect(mapStateToProps, mapDispatchToProps)(Mine);

export default Mine;