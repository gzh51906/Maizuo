import React, { Component } from 'react';

import { Button, Row, Col } from 'antd';

import "./setting.css";
import { log } from 'util';

class Setting extends Component {
    state = {
        src: "../../asset/mineimg/arrow.png"
    }
    logout = () => {
        console.log("退出登录");

    }
    ugoto = () => {
        this.props.history.goBack();
    }
    render() {
        let { src } = this.state;
        return (
            <div className="setting">
                <Row
                    className='s        _header'
                >
                    <div className="left"
                        onClick={this.ugoto}
                    >
                        <img src="../../asset/mineimg/arrow-left.png" alt="" />
                    </div>
                    <div className="center">设置</div>
                    <div className="right"></div>
                </Row>
                <Row
                    className='u_id u_row_common'
                >
                    <span>账号ID</span>
                    <span>230669957</span>
                </Row>
                <Row
                    className='u_password'
                >
                    <Row
                        className='u_row_common'
                    >
                        <span>登录密码</span>
                        <span>修改</span>
                        <img src={src} alt="" />
                    </Row>
                    <Row
                        className='u_row_common'
                    >
                        <span>安全密码</span>
                        <span>未设置</span>
                        <img src={src} alt="" />
                    </Row>
                </Row>
                <Row
                    className='u_back'
                >
                    <Row
                        className='u_row_common'
                    >
                        <span>软件版本</span>
                        <img src={src} alt="" />
                    </Row>
                    <Row
                        className='u_row_common'
                    >
                        <span>意见反馈</span>
                        <img src={src} alt="" />
                    </Row>
                </Row>
                <Row
                    className='u_huancun u_row_common'
                >
                    <span>清除缓存</span>
                    <img src={src} alt="" />
                </Row>
                <Row
                    className='u_logout'
                    onClick={this.logout}
                >
                    退出登录
                </Row>
            </div>
        )
    }
}

export default Setting;