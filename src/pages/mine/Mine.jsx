import React, { Component } from 'react';

import { Carousel, Button, Menu, Row, Col } from 'antd';

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
        ]
    };

    ligoto = (path, e) => {
        console.log(path);

        e.stopPropagation();
        this.props.history.push(path)
    }

    setinfo = () => {
        this.props.history.push('/user');
    }

    render() {


        return (
            <div className="mine">
                <Row className='m_header'>
                    <img src="https://mall.s.maizuo.com/4f0b29878f62f5e298a89a4654f0e8f0.jpg" alt="" onClick={this.setinfo} />
                    <div className="m_h_name" onClick={this.setinfo}>手机号码123456789</div>
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


export default Mine;