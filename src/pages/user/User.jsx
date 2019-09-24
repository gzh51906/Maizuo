import React, { Component } from 'react';

import { Button, Row, Col, Drawer } from 'antd';

import './user.css'

//---------------------------

//0-----------------------


class User extends Component {
    state = {
        visible: false,
        placement: 'bottom',
        // date: now,
        // time: now,
        // utcDate: utcNow,
        // dpValue: null,
        // customChildValue: null
    }

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    goto = () => {
        console.log(111);

    }

    render() {
        return (
            <div className="user">
                <Row
                    className='u_header'
                >
                    <div className="left"
                        onClick={this.goback}
                    >
                        <img src="../../asset/mineimg/arrow-left.png" alt="" />
                    </div>
                    <div className="center">我的资料</div>
                    <div className="right"></div>
                </Row>
                <Row className="u_item">
                    <Row className="head">
                        <Col>头像</Col>
                        <Col style={{ flex: 1 }}>上传</Col>
                        <img src="../../asset/mineimg/arrow.png" alt="" />
                    </Row>
                    <Row className="common nickname">
                        <Col>昵称</Col>
                        <Col className='value'>132****4645</Col>
                        <img src="../../asset/mineimg/arrow.png" alt="" />
                    </Row>
                    <Row className="common gender" onClick={this.showDrawer}>
                        <Col>性别</Col>
                        <Col className='value'>未设置</Col>
                        <img src="../../asset/mineimg/arrow.png" alt="" />
                    </Row>
                    <Row className="common birthday" onClick={this.showDrawer}>
                        <Col>出生日期</Col>
                        <Col className='value'>未设置</Col>
                        <img src="../../asset/mineimg/arrow.png" alt="" />
                    </Row>
                </Row>
                {/* <Drawer
                    title="Basic Drawer"
                    placement={this.state.placement}
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >

                </Drawer> */}
            </div>
        )
    }
}

export default User;
