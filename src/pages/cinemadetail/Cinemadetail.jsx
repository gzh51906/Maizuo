import React, { Component } from 'react'
import Api from '../../api'
import { connect } from 'react-redux';
import './cinemadetail.css'
import { Icon, Tabs } from 'antd';

const { TabPane } = Tabs;

import { Carousel, WingBlank } from 'antd-mobile';

class Cinemadetail extends Component {
    state = {
        data: ['../../asset/img/p.jpg', '../../asset/img/z.jpg', '../../asset/img/w.jpg', '../../asset/img/x.jpg', '../../asset/img/l.jpg', '../../asset/img/y.jpg', '../../asset/img/zx.jpg', '../../asset/img/j.jpg', '../../asset/img/xx.jpg', '../../asset/img/m.jpg', '../../asset/img/f.jpg'],

        slideIndex: 0,
        // 标签时间
        date: [],
        film: {},
        actors: "",
        // 影院信息
        cinema: "",
        showtime: [],
        // 选者场次的时间
        selecttime: '',

        language: '',
        // 选中的影片id
        filmId: "",







    }
    async componentDidMount() {


        // 影院信息
        let data = await Api.get('http://localhost:1908/cinema/id', { _id: this.props.match.params.id })
        // console.log("data", data)
        this.setState({ cinema: data.data[0] })
        var date = new Date()
        // 月


        let arr = []
        this.setState({ month: date.getMonth() + 1 })
        for (var i = 0; i < 7; i++) {
            if (date.getDate() + i <= 30) {
                arr.push(`${date.getMonth() + 1}月${date.getDate() + i}日`)
            }
            if (date.getDate() + i > 30) {
                arr.push(`${date.getMonth() + 2}月${i}日`)
            }
        }
        this.state.selecttime = arr[0];
        this.setState({ date: arr, selecttime: arr[0] })


        this.props.getFilm()
        setTimeout(() => {
            this.state.film = this.props.filmlist[0]
            // console.log(this.props.filmlist[0])
            this.setState({ film: this.props.filmlist[0], })
            // console.log(this.state.film)
            let arr = JSON.parse(this.props.filmlist[0].actors).map((item) => { return '|' + item.name }).join("")
            this.state.actors = arr
            this.setState({ actors: arr })
        }, 2500)
        // 请求播放时间
        let show = await Api.get('http://localhost:1908/cinema/showtime', {})
        console.log("1111", show)
        this.state.showtime = show.data
        this.setState({
            showtime: show.data
        })


    }

    slideshow = (i) => {
        // console.log(i, this.props.filmlist[i])
        setTimeout(() => {
            this.setState({ film: this.props.filmlist[i] })
            // console.log(JSON.parse(this.state.film.actors))

            let arr = JSON.parse(this.props.filmlist[i].actors).map((item) => { return '|' + item.name }).join("")
            // this.setState({ actors: arr })
            // console.log(this.state.filmId)
        }, 100)

    }
    // 日期选项卡
    callback = (key) => {
        this.state.selecttime = key
        this.setState({ selecttime: key })
    }
    //路由跳转
    goto = (id2) => {
        // this.props.history.push({ pathname: path, query: { filmname: this.state.film.name, time: this.state.selecttime, showtime: '09: 45', cinema: this.state.cinema.name } })
        let id1 = this.props.match.params.id
        let id = id1 + "&" + id2 + "&" + this.state.film._id + "&" + this.state.film.name
        console.log(id)
        this.props.history.push(`/schedule/${id}`)
    }


    render() {

        return (
            <div className="cinemadetail" onScroll={this.handleScroll}>
                <div className="heard-left" onClick={this.goto.bind(this, '/cinema')}><img src="../../asset/img/left.png" /> </div>


                <div className="header-title">
                    {this.state.cinema.name}
                </div>

                <div className="tags">
                    <div className="tag">儿童票</div>
                    <div className="tag">停车</div>
                    <div className="tag">3D眼镜</div>
                    <div className="tag">影厅介绍</div>
                    <Icon type="right" />
                </div>
                <div className="address"><img src="../../asset/img/dingwei.png" /><p>{this.state.cinema.address}</p><img className="dianhua" src="../../asset/img/dianhua.png" /></div>
                <div className='flim'>
                    <WingBlank style={{ height: '100%' }}>
                        <Carousel className="space-carousel"
                            frameOverflow="visible"
                            style={{ height: '100%' }}
                            cellSpacing={10}
                            slideWidth={'100px'}

                            beforeChange={(from, to) => {

                                // console.log(`slide from ${ from } to ${ to } `)
                            }}
                            afterChange={index => {
                                this.slideshow(index)
                                this.setState({ slideIndex: index })

                            }}
                        >
                            {this.state.data.map((val, index) => (
                                <a
                                    key={val}

                                    style={{
                                        width: '72px',
                                        height: "104px",

                                        display: 'block',
                                        position: 'relative',
                                        top: this.state.slideIndex === index ? -10 : 0,


                                        boxShadow: '2px 1px 1px rgba(0, 0, 0, 0.2)',
                                    }}
                                >
                                    <img
                                        src={val}
                                        alt=""
                                        style={{
                                            width: '100%',
                                            height: "104px", verticalAlign: 'top'
                                        }}
                                        onLoad={() => {
                                            // fire window resize event to change height
                                            window.dispatchEvent(new Event('resize'));

                                        }}
                                    />
                                </a>
                            ))}
                        </Carousel>
                    </WingBlank>
                    <div className="triangle">
                        <img src={'../../asset/img/top.png'} />
                    </div>
                </div>
                <div className='film-info'>
                    <div className="film-header">
                        <span className="film-name">{this.state.film.name}</span>
                        <span className="film-score">{this.state.film.grade}</span>
                        <span className="film-unit">分</span>
                    </div>
                    <div className="film-desc">{this.state.film.category} | {this.state.film.runtime}分钟{this.state.actors}</div>
                    <img src={'../../asset/img/right.png'} alt="" />
                </div>
                <div className="tabs-bar">
                    <Tabs defaultActiveKey="1" onChange={this.callback} >
                        {this.state.date.map(item => {
                            return <TabPane tab={item} key={item}>
                                {this.state.showtime.map(item => {
                                    return <div className='schedule-item' key={item._id}>

                                        <div className="left">
                                            <div className="start-at">09:45</div>
                                            <div className="end-at">11:50散场</div>
                                        </div>
                                        <div className="middle">
                                            <div className='language'>{item.filmLanguage}{item.imagery}</div>
                                            <div className='hall'>{item.hallName}</div>
                                        </div>
                                        <div className='right'>
                                            <div onClick={this.goto.bind(this, item._id)} className='buy-ticket' >购票</div>
                                            <div className="price">
                                                <span>￥</span>{item.salePrice / 100}
                                            </div>
                                        </div>
                                    </div>
                                })}

                            </TabPane>

                        })}


                    </Tabs>,
                </div>
            </div >
        )
    }
}


let mapStateToProps = function (state) {
    return {
        filmlist: state.cinema.filmlist,
        actfilm: state.cinema.actfilm,

    }
}

let mapDispatchToProps = function (dispatch) {
    return {
        getFilm() {

            dispatch({ type: 'GET_FILM' })
        },
        actFilm(index) {
            dispatch({ type: 'act_film', index })
        }

    }
}
Cinemadetail = connect(mapStateToProps, mapDispatchToProps)(Cinemadetail)
export default Cinemadetail;