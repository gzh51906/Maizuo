import React, { Component } from 'react';

import { Route, Redirect, Switch, withRouter } from 'react-router-dom';

import { Button, Row, Col, Icon, Collapse, List, Card, Affix } from 'antd';
const { Panel } = Collapse;

import Api from "../../api"

import './filmDetail.css';

class filmDetail extends Component {
    state = {
        data: {},
        filmTypename: '',
        top: 10
    }
    async componentDidMount() {
        console.log(this.props);

        let { id } = this.props.match.params
        let { data } = await Api.getflimdetail(id)
        console.log(data[0]);

        this.setState({
            data: data[0],
            filmTypename: data[0].filmType.name
        })

    }
    callback(key) {
        console.log(key);
    }
    top = (affixed) => {
        console.log(affixed, 11111);
    }
    goto = (e) => {
        this.props.history.goBack()
        // this.props.history.push('/film')
    }
    goforward = () => {
        console.log(111111111111);

        // this.props.history.push('/film')
    }

    render() {
        let { adv, category, name, premiereAt, nation, runtime, synopsis, actors, photos } = this.state.data;
        return (
            <div className="detail"
                ref={node => {
                    this.container = node;
                }}
            >
                <Affix
                    offsetTop={0}
                    target={() => this.container}
                    className="goback"
                    onChange={affixed => console.log(affixed, 111111111)}
                >
                    <Icon type="left" style={{ width: 30 }} onClick={this.goto}></Icon>
                </Affix>
                <Row className="d_photo">
                    <img src={adv} alt="" />
                </Row>
                <Row className="d_filminfo">
                    <Col>
                        <span className="d_f_name">{name}</span>
                        <span className='d_f_type'>{this.state.filmTypename}</span>
                    </Col>
                    <Col className="d_f_common">{category}</Col>
                    <Col className="d_f_common">{premiereAt}</Col>
                    <Col className="d_f_common">{nation} | {runtime} 分钟</Col>
                    <Col className="d_f_synopsis">
                        {/* <Collapse defaultActiveKey={['1']} onChange={this.callback}>
                            <Panel header="" key="1"> */}
                        <p>{synopsis}</p>
                        {/* </Panel>
                        </Collapse> */}
                    </Col>
                    {/* <Col className="d_f_toggle">
                        <Icon type="down" onClick={this.plus}></Icon>
                    </Col> */}
                </Row>
                <Row className="d_actors">
                    <Col style={{
                        width: "100%",
                        padding: 15
                    }}>演职人员</Col>
                    <List
                        grid={{ gutter: 20, column: 5 }}
                        dataSource={actors}
                        style={{ height: 140 }}
                        renderItem={item => (
                            <List.Item style={{ width: 85, height: 131 }}>
                                <Card
                                    style={{ width: 85, height: 131 }}
                                    cover={<img alt="example" src={item.avatarAddress} />}
                                >
                                    <p>{item.name}</p>
                                    <p>{item.role}</p>
                                </Card>
                            </List.Item>
                        )}
                    />
                </Row>
                <Row className="d_filmphoto">
                    <Col className="d_f_photos">
                        <span>剧照</span>
                        {/* <span>全部（{photos.length}）</span> */}
                    </Col>
                    <List
                        grid={{ gutter: 20, column: 5 }}
                        dataSource={photos}
                        style={{ height: 140 }}
                        renderItem={item => (
                            <List.Item style={{ width: 150, height: 84 }}>
                                <Card
                                    style={{ width: 150, height: 84 }}
                                    cover={<img alt="example" src={item} />}
                                >
                                </Card>
                            </List.Item>
                        )}
                    />
                </Row>
                <Row className="gotobuy" onClick={this.goforward}>
                    选座购票
                </Row>
            </div >
        )
    }
}
export default filmDetail;