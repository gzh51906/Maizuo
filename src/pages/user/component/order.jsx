import React, { Component } from 'react';
import Api from '../../../api'
import { Button, Row, Col } from "antd";

import './order.css'

class Order extends Component {
    state = {
        userInfo: {},
        orderlist: [],
    }
    async componentDidMount() {
        // 获取登入者信息
        let userInfo = JSON.parse(window.localStorage.getItem('userInfo'));


        // console.log(userInfo, this.state.userInfo)
        let { data } = await Api.get('http://localhost:1908/cinema/usergoods', { _id: userInfo._id })
        console.log(data[0].oderlist)
        this.setState({ userInfo: userInfo, orderlist: JSON.parse(data[0].oderlist) })
    }

    goback = () => {
        this.props.history.goBack();
    }
    cancel = () => {
        console.log("取消订单", this.state.orderlist);
    }

    reset = () => {
        console.log("重新购买");
    }
    render() {
        return (
            <div className="order">
                <Row
                    className='o_header'
                >
                    <div className="left"
                        onClick={this.goback}
                    >
                        <img src="../../asset/mineimg/arrow-left.png" alt="" />
                    </div>
                    <div className="center">电影订单</div>
                    <div className="right"></div>
                </Row>
                <Row className="o_lists">
                    {this.state.orderlist.map((item, i) => {
                        return (
                            <Row className='list' key={i}>
                                <Row className='l_top'>
                                    <Col className='img_box'>
                                        <img src={item.src} alt="" />
                                    </Col>
                                    <Col className='info_box'>
                                        <div className='title'>{item.name}</div>
                                        <div className='time'>{item.time}</div>
                                        <div className='price'>

                                            <span>￥ {item.price}</span>
                                            <span>x{item.num}</span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className='l_center'>
                                    <span className='all-count'>共1件商品</span>
                                    <span className='real-pay'>实付</span>
                                    <span className='count'><i>￥</i> {item.total}</span>
                                </Row>
                                <Row className='l_foot'>
                                    <Col className='cancel' onClick={this.cancel}>
                                        订单取消
                                </Col>
                                    <Button className="reset" onClick={this.reset}>重新购买</Button>
                                </Row>
                            </Row>
                        )
                    })}


                </Row>

            </div>
        )
    }
}

export default Order;