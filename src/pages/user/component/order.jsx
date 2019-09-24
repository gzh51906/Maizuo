import React, { Component } from 'react';

import { Button, Row, Col } from "antd";

import './order.css'

class Order extends Component {
    state = {

    }

    goback = () => {
        this.props.history.goBack();
    }
    cancel = () => {
        console.log("取消订单");
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
                    <Row className='list'>
                        <Row className='l_top'>
                            <Col className='img_box'>
                                <img src="" alt="" />
                            </Col>
                            <Col className='info_box'>
                                <div className='title'>中国机长</div>
                                <div className='time'>星期一 2019-9-30 10:10</div>
                                <div className='price'>

                                    <span>￥ 41</span>
                                    <span>x1</span>
                                </div>
                            </Col>
                        </Row>
                        <Row className='l_center'>
                            <span className='all-count'>共1件商品</span>
                            <span className='real-pay'>实付</span>
                            <span className='count'><i>￥</i> 41</span>
                        </Row>
                        <Row className='l_foot'>
                            <Col className='cancel' onClick={this.cancel}>
                                订单取消
                            </Col>
                            <Button className="reset" onClick={this.reset}>重新购买</Button>
                        </Row>
                    </Row>
                </Row>

            </div>
        )
    }
}

export default Order;