import React, { Component } from 'react'
import Api from '../../api'
import { connect } from 'react-redux';
import './cinemadetail.css'
import { Icon, Tabs } from 'antd';

const { TabPane } = Tabs;

import { Carousel, WingBlank } from 'antd-mobile';

class Cinemadetail extends Component {
    state = {
        // 所有影片图片
        data: [],

        slideIndex: 0,
        // 标签时间
        date: [],
        film: {},
        // 所有演员信息
        allactors: [],
        // 当前选中影片演员
        actors: "",
        // 影院信息
        cinema: {},
        showtime: [],
        // 选者场次的时间
        selecttime: '',
        language: '',
        // 选中的影片id
        filmId: "",

        // 所有影片信息
        allfilm: [],
        // 选中的影片所有信息
        actfilm: {},








    }
    async componentDidMount() {
        // 影片信息
        let allfilm = await Api.get('http://localhost:1908/cinema/film', {})
        console.log(allfilm)

        // 影片的图片
        let srcarr = []
        // 演员
        let act = []
        allfilm.data.forEach((item, i) => {
            let arr = []
            arr.push(item.director + " | ")
            srcarr.push(item.poster)

            JSON.parse(item.actors).forEach((e, index) => {
                arr.push(e.name)
            })

            act.push(arr)
        })


        this.setState({ allfilm: allfilm.data, data: srcarr, actors: act[0].join(''), actfilm: allfilm.data[0], allactors: act })

        // 影院信息
        let data = await Api.get('http://localhost:1908/cinema/id', { _id: this.props.match.params.id })

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



        //   请求影厅的数据
        let show = await Api.get('http://localhost:1908/cinema/showtime', {})

        this.state.showtime = show.data
        this.setState({
            showtime: show.data
        })


    }

    slideshow = (i) => {

        this.setState({ actfilm: this.state.allfilm[i], actors: this.state.allactors[i] })


    }
    // 日期选项卡
    callback = (key) => {
        this.state.selecttime = key
        this.setState({ selecttime: key })
    }
    //路由跳转
    goto = (id2) => {

        let id1 = this.props.match.params.id
        let id = id1 + "&" + id2 + "&" + this.state.actfilm._id + "&" + this.state.actfilm.name

        this.props.history.push(`/schedule/${id}`)
    }
    gotoback = () => {
        this.props.history.push(`/cinema`)
    }
    componentWillUnmount() {
        // 卸载异步操作设置状态
        this.setState = (state, callback) => {
            return;
        }
    }


    render() {

        return (
            <div className="cinemadetail" onScroll={this.handleScroll}>
                <div className="heard-left" onClick={this.gotoback.bind(this, '/cinema')}><img src="../../asset/img/left.png" /> </div>


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
                        <span className="film-name">{this.state.actfilm.name}</span>
                        <span className="film-score">{this.state.actfilm.grade}</span>
                        <span className="film-unit">分</span>
                    </div>
                    <div className="film-desc">{this.state.actfilm.category} | {this.state.actfilm.runtime}分钟|{this.state.actors}</div>
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
        // filmlist: state.cinema.filmlist,
        // actfilm: state.cinema.actfilm,

    }
}

let mapDispatchToProps = function (dispatch) {
    return {
        // getFilm() {

        //     dispatch({ type: 'GET_FILM' })
        // },
        // actFilm(index) {
        //     dispatch({ type: 'act_film', index })
        // }

    }
}
Cinemadetail = connect(mapStateToProps, mapDispatchToProps)(Cinemadetail)
export default Cinemadetail;