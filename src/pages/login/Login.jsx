import React, { Component } from 'react';

import { Button, Menu, Icon, Input, Row, Col, Form, Checkbox } from 'antd';

import { connect } from 'react-redux'

import { Redirect, withRouter } from 'react-router-dom';

import './login.css'

class NormalLoginForm extends Component {
    state = {
        frompath: "",

    }
    componentDidMount() {
        console.log(this.props);

    }
    phone = (e) => {
        console.log(e.target.value);

    }
    getcode = () => {
        alert("验证码：123456")

    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.start_login(values)
                // this.props.history.push('/mine')
                // console.log(this.props);

            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        // console.log(this.props.history.location.pathname, 2222);
        console.log(this.props.logindata.isLoading);

        return (
            this.props.logindata.isLogin
                ?
                <Redirect to='/mine' />
                :
                < div className='login' >
                    <Row className='logo'>
                        <img src="../../asset/img/logo.png" alt="" />
                    </Row>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item className='getcode cd_common'>
                            {getFieldDecorator('phone', {
                                rules: [{ required: false, message: 'Please input your username!' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="手机号码"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item className='putcode cd_common'>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input
                                    disabled={this.props.logindata.isLoading}
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item className="submit">
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(<Checkbox disabled={this.props.logindata.isLoading}>记住我</Checkbox>)}

                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                             </Button>

                        </Form.Item>
                    </Form>
                </div >

            // !this.props.logindata.isLogin
            //     ?

            // :
            // 
        )
    }
}
let Login = Form.create({ name: 'normal_login' })(NormalLoginForm);

let mapStateToProps = function (state) {
    // 需要映射什么到Cart组件的props就return什么出去
    return {
        logindata: state.user,
    }
}

let mapDispatchToProps = function (dispatch) {
    return {
        start_login(values) {
            dispatch({ type: 'START_LOGIN', values })
        }
    }
}

Login = connect(mapStateToProps, mapDispatchToProps)(Login);

Login = withRouter(Login);

export default Login;
