import React, { Component } from 'react';
import { Affix, Button, Icon, Row, Col } from 'antd';
import './cinema.css'
import Api from '../../api'
import { connect } from 'react-redux';
import ComponentButtom from '../../component/ComponentButtom/ComponentButtom'





class Discover extends Component {

    state = {
        // DOM节点
        ref: "",
        DOM: false,
        // 
        clicknum: 1,
        openKeys: '',
        top: 0,
        sub2list: ["App订票", "前台兑票"],
        sub2active: "App订票",
        sub3list: ["最近去过", "离我最近"],
        sub3active: "最近去过",
        // 请求次数
        reqnum: 1,
        page: 1,
        cinemalist: [],
        isreq: false,
        overreq: true,
        // 前台兑票
        orderreq: 1,
        orderlist: [],
        orderpage: 1,
        orderISreq: false,
        order: [],
        // 地区
        address: [],
        actaddress: "全城",






    };
    blcok = (sub) => {
        if (this.state.clicknum == 1) {
            this.setState({
                openKeys: sub,
                clicknum: 2,
            })

        } else {
            this.setState({
                openKeys: '',
                clicknum: 1,
            })
        }

    }
    sub2list = (i) => {
        let text = this.state.sub2list[i]
        this.setState({
            sub2active: text
        })
        if (this.state.DOM) {
            this.state.ref.scrollTop = 0
        }

    }
    sub3list = (i) => {

        let text = this.state.sub3list[i]

        this.setState({
            sub3active: text
        })
    }
    async  componentDidMount() {
        let data = await Api.get('http://localhost:1908/cinema/check', {})
        // console.log(data.data)
        this.setState({
            cinemalist: data.data.slice(0, 20),
            page: parseInt(data.data.length / 20)
        })
        let arr = ["全城"];
        data.data.forEach(item => {
            if (arr.indexOf(item.districtName) == -1) {
                arr.push(item.districtName)
                this.setState({
                    address: arr
                })
            }
        })



        this.props.getCinema(this.state.cinemalist)
        // console.log(this.props, this.state.page)
        // console.log(data)
        // ------ 前台兑票
        let order = data.data.filter((item) => { return item.ticketTypes != null })
        this.setState({
            orderlist: order.slice(0, 20),
            orderpage: parseInt(order.length / 20),
            order: order,
        })
        this.props.orderCinema(this.state.orderlist)


    }
    // 选择区域
    address1 = (item) => {
        this.setState({
            actaddress: item
        })
        this.props.address(item)
        if (this.state.DOM) {
            this.state.ref.scrollTop = 0
        }

    }


    handleScroll = async (e) => {
        this.setState({
            ref: e.target
        })
        if (e.target.scrollTop >= 100) {
            this.setState({
                DOM: true
            })
        }
        // console.log(e.target.scrollTop)
        if (e.target.scrollTop >= 800 * this.state.reqnum && !this.state.isreq && this.state.sub2active == 'App订票') {
            this.setState({ reqnum: this.state.reqnum + 1 })
            this.props.addCinema(20, this.state.reqnum)

            if (this.state.reqnum == this.state.page) {
                this.setState({
                    isreq: true
                })
            }

        }
        if (e.target.scrollTop >= 1200 * this.state.orderreq && !this.state.orderISreq && this.state.sub2active == '前台兑票') {
            this.setState({ orderreq: this.state.orderreq + 1 })
            let order = this.state.order.slice(this.state.orderreq, this.state.orderreq * 20)
            this.props.addorder(order)
        }
        if (this.state.orderreq == this.state.orderpage) {
            this.setState({
                orderISreq: true
            })
        }

    }
    // 跳转
    goto = (_id) => {
        this.props.history.push(`/cinemadetail/${_id}`)
    }


    render() {
        let data = this.props
        // console.log(data);

        return (
            <div
                ref="top"
                onScroll={this.handleScroll}
                className="cinema"
                ref={node => {
                    this.container = node;
                }}
            >

                <Affix
                    offsetTop={this.state.top}
                    target={() => this.container}
                >
                    <div className="cinema-top">
                        <span className="cinema-address">广州 <Icon type="down" className="down" /></span>
                        <span className="cinema-name">影院</span>
                        <Icon type="search" className="fdj" />
                    </div>
                    <div className="select">
                        <Row>
                            <Col span={8} onClick={this.blcok.bind(this, 'sub1')}>
                                {this.state.actaddress}{this.state.openKeys == 'sub1' ? <Icon type="up" className="down" /> : <Icon type="down" className="down" />}</Col>
                            <Col span={8} onClick={this.blcok.bind(this, 'sub2')}>{this.state.sub2active}{this.state.openKeys == 'sub2' ? <Icon type="up" className="down" /> : <Icon type="down" className="down" />}</Col>
                            <Col span={8} onClick={this.blcok.bind(this, 'sub3')}>{this.state.sub3active}{this.state.openKeys == 'sub3' ? <Icon type="up" className="down" /> : <Icon type="down" className="down" />}</Col>
                        </Row>
                        {this.state.openKeys == 'sub1' ? <div className="sub1 sub"><ul>
                            {this.state.address.map(item => {
                                return <li key={item} onClick={this.address1.bind(this, item)}>{item}</li>
                            })}
                        </ul></div> : ''}
                        {this.state.openKeys == 'sub2' ? <div className="sub2 sub">
                            {this.state.sub2list.map((item, i) => { return <p key={i} onClick={this.sub2list.bind(this, i)}>{item}</p> })}
                        </div> : ''}
                        {this.state.openKeys == 'sub3' ? <div className="sub3 sub">
                            {this.state.sub3list.map((item, i) => { return <p key={i} onClick={this.sub3list.bind(this, i)}>{item}</p> })}
                        </div> : ''}


                    </div>

                </Affix>
                {/*------------- 电影院列表 ------------*/}
                <div className="list">
                    {this.state.sub2active == '前台兑票' ? <ul>
                        {/* 前台兑票 */}
                        {this.props.orderlist.map((item, i) => {
                            return <li key={i} onClick={this.goto.bind(this, item._id)}>
                                <div className="list-left">
                                    <h5>{item.name}</h5>
                                    {JSON.parse(item.ticketTypes).map(item => { return <span key={item.name}>{item.name}</span> })}

                                    <p>{item.address}</p>
                                </div>
                                <div className="list-right">
                                    <p className='jiage'><span className='price-text'>￥</span><span className='price'>{parseInt(item.latitude)}</span><span className='price-text'>起</span></p>
                                    <p className='juli'>距离未知</p>
                                </div>
                            </li>
                        })}

                    </ul> : <ul>
                            {/* App订票 */}
                            {this.props.cinemalist.map((item, i) => {
                                return <li key={i} onClick={this.goto.bind(this, item._id)}>

                                    <div className="list-left">
                                        <h5>{item.name}</h5>
                                        <p>{item.address}</p>
                                    </div>
                                    <div className="list-right">
                                        <p className='jiage'><span className='price-text'>￥</span><span className='price'>{parseInt(item.latitude)}</span><span className='price-text'>起</span></p>
                                        <p className='juli'>距离未知</p>
                                    </div>
                                </li>
                            })}
                        </ul>}

                </div>

                <ComponentButtom />
            </div>
        )
    }
}

let mapStateToProps = function (state) {
    return {
        cinemalist: state.cinema.cinemalist,
        orderlist: state.cinema.orderlist,

    }
}

let mapDispatchToProps = function (dispatch) {
    return {
        getCinema(cinemalist) {

            dispatch({ type: 'GET_CINEMA', cinemalist })
        },
        addCinema(limit, skip) {
            dispatch({ type: 'ADD_CINEMA', limit, skip })
        },
        orderCinema(orderlist) {
            dispatch({ type: 'GET_RODER', orderlist })
        },
        addorder(order) {
            dispatch({ type: 'ADD_RODER', order })
        },
        // 区域电影院
        address(address) {
            dispatch({ type: 'GET_ADDRESS', address })
        }

    }
}
Discover = connect(mapStateToProps, mapDispatchToProps)(Discover)
export default Discover;