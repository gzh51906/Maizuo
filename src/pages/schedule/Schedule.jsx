import React, { Component } from 'react'
import Api from '../../api'
import { connect } from 'react-redux';
import './schedule.css'
import '../../asset/font_p8eg234wy9/iconfont'

class Schedule extends Component {
    state = {
        // 
        // 点击的候的位置
        startX: '',
        startY: '',

        // 滑过动的位置
        moveX: 0,
        moveY: 0,
        // 0代表这个没有位置，1代表空位，2代表已经被人订了，3代表自己预定
        seats: [],
        // seat: [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,], [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1], [0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1], [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2]],
        // 取消选座
        iSoff: false,
        totalprice: 0,
        // 屏幕
        screen: 113.728,
        screenname: '',
        // 电影院信息
        cinema: {},
        // 电影播放时间信息
        hour: '',
        month: '',
        // 电影名
        filmname: '',
        // 语言
        language: {},
        id: '',
        // 数量
        qty: 0


    }
    // 触屏滑动
    tuchstart = (evt) => {

        let x = evt.targetTouches[0].pageX
        let y = evt.targetTouches[0].pageY;

        this.setState({ startX: x, startY: y })


        // console.log('start', this.state.moveX, this.state.moveY)
    }
    touchmove = (evt) => {
        let x = parseInt(evt.targetTouches[0].pageX)
        let y = parseInt(evt.targetTouches[0].pageY);
        // console.log(x, y)


        this.setState({ moveX: parseInt(this.state.startX - x), moveY: parseInt(this.state.startY - y), screen: -(-90 - parseInt(this.state.startX - x)) })




    }
    touchend = (evt) => {
        let x = evt.changedTouches[0].pageX;
        let y = evt.changedTouches[0].pageY;



    }
    totalprice = () => {
        let price = 0
        this.state.seats.forEach((e, i) => {
            e.forEach((item, index) => {
                if (item == 3) {
                    price += (this.state.language.salePrice * 1 / 100)
                }
            })
        })

        this.state.totalprice = price
        this.setState({
            totalprice: price
        })
    }
    // 选座
    select = (index, i) => {

        if (this.state.seats[index][i] == 2) {
            alert('这个座位已经被人预定了')
        }

        if (this.state.seats[index][i] == 1) {
            this.state.qty += 1
            // 让手机号码显示
            // 让用户控制购票数量为5张
            if (this.state.qty <= 5) {
                this.state.seats[index][i] = 3
                this.state.iSoff = !false
                this.setState({
                    seats: this.state.seats, iSoff: !this.state.iSoff
                })

                this.totalprice()
            } else { alert('最多限购5张') }

            // console.log(this.state.totalprice)
        }
        // 取消选座
        if (this.state.seats[index][i] == 3 && !this.state.iSoff) {
            this.state.seats[index][i] = 1

            this.setState({
                seat: this.state.seats
            })
            this.totalprice()

            // 让手机号码显示

            // console.log(this.state.totalprice)
        }
        if (this.state.totalprice != 0) {
            this.refs.phone.style.display = 'block'
        } else {
            this.refs.phone.style.display = 'none'
        }

    }
    async  componentDidMount() {
        // console.log(this.props)
        let num = this.props.location.pathname.lastIndexOf("/")
        let str = this.props.location.pathname.slice(num + 1)
        let arr = str.split('&')
        let id1 = arr[0];
        let id2 = arr[1];
        // 电影院信息
        let data1 = await Api.get('http://localhost:1908/cinema/id', { _id: id1 })
        this.setState({ cinema: data1.data[0] })
        //    播放时间
        let data2 = await Api.get('http://localhost:1908/cinema/showtime1', { _id: id2 })
        this.state.language = data2.data[0]
        this.setState({ showtime1: data2.data[0], filmname: arr[3], screenname: data2.data[0].hallName, language: data2.data[0] })
        let date = new Date(data2.data[0].showAt * 1000)
        // 月
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
        // 日
        var D = date.getDate()
        // 小时
        var h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours())
        var m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes())
        let hour = h + ':' + m
        let month = M + '月' + D + '日'
        console.log('data2', data2)
        console.log('data1', data1)
        this.state.hour = hour
        this.setState({ hour, month })
        // 让座位被选中没有提交订单的变为空座位
        let seatarr = JSON.parse(data2.data[0].seat)

        seatarr.forEach((e, i) => {
            e.forEach(async (item, index) => {
                if (item == 3) {
                    seatarr[i][index] = 1
                    let data = await Api.patch('http://localhost:1908/cinema/upseat', { _id: this.state.language._id, seat: JSON.stringify(seatarr) })
                    // console.log(seatarr)

                }
            })
        })
        // console.log(seatarr)
        this.setState({ seats: seatarr })
        // 设置要传的id
        let id = id1 + '&' + id2 + '&' + arr[2]
        this.setState({ id: id })



    }
    // 返回上一级
    back = () => {
        this.props.history.go(-1)
    }
    // 跳转订单
    gotoorder = () => {
        // console.log(this.state.language._id)
        this.state.seats.forEach((e, i) => {
            e.forEach(async (item, index) => {
                if (item == 3) {
                    let data = await Api.patch('http://localhost:1908/cinema/upseat', { _id: this.state.language._id, seat: JSON.stringify(this.state.seats) })

                    this.props.history.push(`/orderlist/${this.state.id}`)
                }
            })
        })
    }

    render() {
        return (
            <div className='schedule'>
                <div className='header'>
                    <div className='header-left' onClick={this.back}><img src="../../asset/img/left.png" /></div>
                    <div className='header-title'>{this.state.cinema.name}</div>
                    <div className='header-right'></div>
                </div>
                <div className='info'>
                    <div className='film-name'>{this.state.filmname}</div>
                    <div className='film-des'>{this.state.month} {this.state.hour} {this.state.language.filmLanguage}{this.state.language.imagery}</div>
                </div>
                <div className='seating' onTouchStart={this.tuchstart} onTouchEnd={this.touchend} onTouchMove={this.touchmove}>
                    <div className='seating-chart'>
                        <div className='screen' style={{ transform: "scale(0.974118)", left: this.state.screen }}>{this.state.screenname}</div>
                        <div className='map' ref="map" style={{ transform: `translate(${this.state.moveX}px, ${this.state.moveY}px)` }}>
                            <div className='seats'>
                                {this.state.seats.map((item, index) => {
                                    return item.map((ele, i) => {
                                        return (
                                            ele == 0 ? "" : <div onClick={this.select.bind(this, index, i)} className='seat' style={{ left: '30' * i, top: '30' * index }} key={i}>
                                                <div className='single'>
                                                    {ele == 1 ? <svg className="icon" aria-hidden="true">
                                                        <use xlinkHref="#icon-weishou"></use>
                                                    </svg> : <svg className="icon" aria-hidden="true">
                                                            {ele == 3 ? <use xlinkHref="#icon-yuding"></use> : <use xlinkHref="#icon-yishou"></use>}
                                                        </svg>}
                                                </div>
                                            </div>

                                        )
                                    })
                                })}

                            </div>
                        </div>
                    </div>
                </div>
                <div className='phone-input' style={{ display: 'none' }} ref='phone'><span>手机号：</span><span>13902254175 </span>
                    <img src='../../asset/img/bj.png' /></div>
                <div className='footer-btn' onClick={this.gotoorder}>{this.state.totalprice === 0 ? "请先选座" : this.state.totalprice + ".00元 确认座位"}</div>
            </div >
        )
    }
}

let mapStateToProps = function (state) {
    return {
        // iSoff: state.cinema.iSoff,

    }
}

let mapDispatchToProps = function (dispatch) {
    return {
        changeiSoff(iSoff) {

            dispatch({ type: 'change_isoff', iSoff })
        },


    }
}
Schedule = connect(mapStateToProps, mapDispatchToProps)(Schedule)
export default Schedule