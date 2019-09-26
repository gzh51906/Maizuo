import React, { Component } from 'react';

import { Row, Col, Drawer } from 'antd';

import { DatePicker, List, Picker } from 'antd-mobile';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';
import 'antd-mobile/dist/antd-mobile.css';

import './user.css'

//---------------------------
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
// GMT is not currently observed in the UK. So use UTC now.
const utcNow = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));

// Make sure that in `time` mode, the maxDate and minDate are within one day.
let minDate = new Date(nowTimeStamp - 1e7);
const maxDate = new Date(nowTimeStamp + 1e7);
// console.log(minDate, maxDate);
if (minDate.getDate() !== maxDate.getDate()) {
    // set the minDate to the 0 of maxDate
    minDate = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
}


//0-----------------------

const gender = [
    {
        label: '男',
        value: '男',
    },
    {
        label: '女',
        value: '女',
    },
];

class User extends Component {
    state = {
        visible: false,
        placement: 'bottom',
        date: now,
        time: now,
        utcDate: utcNow,
        dpValue: null,
        customChildValue: null,
        pickerValue: [],
        data: [],
        gendervalue: ""
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

    onChangegender = (gender) => {
        this.setState({
            gendervalue: gender,
        });
    };
    goback = () => {
        this.props.history.goBack();
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

                    <List style={{ backgroundColor: 'white' }} className="picker-list gender">
                        <Picker
                            data={gender}
                            cols={1}
                            className="forss"
                            value={this.state.gendervalue}
                            onChange={this.onChangegender}
                            title="更改性别"
                        >
                            <List.Item arrow="horizontal">性别</List.Item>
                        </Picker>
                    </List>

                    <List className="date-picker-list" style={{ backgroundColor: 'white' }}>
                        <DatePicker
                            mode="date"
                            title=""
                            extra="Optional"
                            value={this.state.date}
                            onChange={date => this.setState({ date })}
                        >
                            <List.Item arrow="horizontal">出生日期</List.Item>
                        </DatePicker>
                    </List >
                </Row>
            </div>
        )
    }
}

export default User;
{/* <Row className="common birthday" onClick={this.showDrawer}>
                        <Col>出生日期</Col>
                        <Col className='value'>未设置</Col>
                        <img src="../../asset/mineimg/arrow.png" alt="" />
                    </Row> */}
{/* <Row className="common gender" onClick={this.showDrawer}>
                        <Col>性别</Col>
                        <Col className='value'>未设置</Col>
                        <img src="../../asset/mineimg/arrow.png" alt="" />
                    </Row> */}