import React, { Component } from 'react'
import Api from '../../api'
import { connect } from 'react-redux';
import { Icon } from 'antd';

import "./orderlist.css"

class Orderlist extends Component {
    state={
    // 影院
    cinema:{},
    //影厅
    cinemaT:{},
    // 影片
    film:{},
      // 上映时间
      showtime:'',
      //影片价格
      filmPrice:'',
    // 电影票总价
    total:0,
    // 电影院座位
    cinemaseat:[],
    // 电影票数量
    ticketnum:0,
    // 购买了票的座位
    buyseat:'',

    }
  
    // 返回上一级
    back=()=>{
        this.props.history.go(-1)
    }
    // 生命周期
    async  componentDidMount(){
        console.log(this.props)
        // 获取影院、影片、影厅id 0是影院 1是影厅 2是影片
        let idarr=this.props.match.params.id.split('&')
        // 影院
        let data1 = await Api.get('http://localhost:1908/cinema/id', { _id: idarr[0] })
        // console.log(data1.data)
        // 影厅
        let data2 = await Api.get('http://localhost:1908/cinema/showtime1', { _id: idarr[1] })
        // console.log(data2.data)
        // 影片
        let data3 = await Api.get('http://localhost:1908/cinema/orderfilm', { _id: idarr[2] })
        // console.log(data3.data)
        this.setState({cinema:data1.data[0],cinemaT:data2.data[0],film:data3.data[0]})
        console.log(this.state.cinema,this.state.cinemaT,this.state.film)
// 电影上映时间
let date = new Date(this.state.film.premiereAt * 1000)
//年
var Y = date.getFullYear()
  // 月
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
  // 日
  var D = date.getDate()
  //  影片价格
  
  this.setState({showtime:Y+"-"+M+"-"+D,filmPrice:this.state.cinemaT.salePrice/100,cinemaseat:JSON.parse(this.state.cinemaT.seat)})
//   查看选中的座位
// console.log(JSON.parse(this.state.cinemaT.seat))
let price = 0
let ticketnum=0
let arrrow=[]
this.state.cinemaseat.forEach((e,i)=>{
    e.forEach((item,index)=>{
        if(item==3){
            arrrow.push(`${i+1}排${index+1}座`)
price+=this.state.filmPrice
ticketnum+=1
        }
    })
})

this.setState({total:price,ticketnum:ticketnum,buyseat:arrrow.join(' ')})
// console.log(price,ticketnum)

    }
    // 确认订单
    buyticket=async ()=>{
        this.state.cinemaseat.forEach((e,i)=>{
            e.forEach((item,index)=>{
                if(item==3){
                    this.state.cinemaseat[i][index]=2
                    this.setState({cinemaseat:this.state.cinemaseat})
                }
            })
        })
        let data = await Api.patch('http://localhost:1908/cinema/upseat', { _id: this.state.cinemaT._id, seat: JSON.stringify(this.state.cinemaseat) })
        alert("支付成功")
    }


    render() {
        return (
            <div className="orderlist">
                <div className="header">
                    <div className="header-left" onClick={this.back}><img src="../../asset/img/left.png" /></div>
                    <div className="header-title">确认订单</div>
                    <div className="header-right"><div className='restTime'>15:00</div></div>
                    </div>
                    <div className='decorate'><img src="../../asset/img/bottom.png" alt=""/></div>
                    <div className="info-input">
                        <i> <Icon type="user" /></i>
                        <div className="phone">
                            <div className='main-info'>13902254175</div>
                            <div className='phone-tip'>订单信息将发送到该手机</div>
                        </div>
                    </div>
                    <div className="group">
                        <div className='product'> 
                        <div className="photo">
                            <img src={this.state.film.poster} alt=""/>
                        </div>
                        <div className='product-info'>
                            <div className='film-name'>{this.state.film.name}</div>
                            <div className='film-time'>{this.state.showtime}</div>
                            <div className='film-cinema'>{this.state.cinema.name}</div>
                            <div className='film-seat'><span>{this.state.cinemaT.hallName}</span>{this.state.buyseat}</div>
                            <div className='num'>x{this.state.ticketnum}</div>
                            <div className='price'>
                                <span className='price-fmt'>
                                    <i>￥</i>
                                    <span className='interge'>{this.state.filmPrice}</span>
                                    <span >.</span>
                                    <span className='decimal'>00</span>
                                </span>
                                <span className='film-tip'>
                        （含服务费5.00元/人）
                    </span>
                            </div>
                        </div>
                     </div>
                     <div className='product-price'>
                         <div className='price-item'>商品金额
                         <div className='price-font'>
                         <span className='price-fmt'>
                                    <i>￥</i>
                                    <span className='interge'>{this.state.total}</span>
                                    <span >.</span>
                                    <span className='decimal'>00</span>
                                </span>
                         </div>
                         </div>
                     </div>
                    </div>
                    <div className='coupon'>
                        <div className='card'>
                            <div className='card-right'><span>0张劵可用</span> <Icon type="right" /></div>
                            <div className='card-left'>
                                <span>卖座券</span>
                                <img src="../../asset/img/juan.png" alt=""/>
                            </div>
                        </div>
                        <div className='balance'>
                            <div className='balance-info'>
                            <img src="../../asset/img/money.png" alt=""/>
                            <div className='balance-name'>余额（<span className='balance-text'>剩余</span>
                            <span className='price-fmt'>
                                    <i>￥</i>
                                    <span className='interge'>0</span>
                                    <span >.</span>
                                    <span className='decimal'>00</span>
                                </span>）
                            </div>
                            </div>
                            <div className='balance-option'>
                            <img src="../../asset/img/jin.png" alt=""/>
                            </div>
                        </div>
                    </div>
                    <div className='tips'>
                        <ul>
                            <li className='tips-header'><div className='tips_icon'><Icon type="exclamation-circle" /></div><div children='tips-title'>注意事项</div></li>
                            <li>
                                <div className='start'>*</div>
                                <div className='tips-text'>该影城不支持订座票退换，请您确认后再进行购买</div>
                            </li>
                            <li>
                                <div className='start'>*</div>
                                <div className='tips-text'>请确定号码无误，支付成功后将无法修改</div>
                            </li>
                            <li>
                                <div className='start'>*</div>
                                <div className='tips-text'>更多信息请查看影院详情</div>
                            </li>
                        </ul>
                    </div>
                    <div className='pay'>
                        <div className='to-pay' onClick={this.buyticket}>提交订单</div>
                        <div className='need-pay'>
                            <span>
                            <span className='price-fmt'>
                                    <i>￥</i>
                                    <span className='interge'>{this.state.total}</span>
                                    <span >.</span>
                                    <span className='decimal'>00</span>
                                </span>
                            </span>
                          
                        </div>
                        <span className='pay-text'>实付</span>
                    </div>
            </div>
        )
    }
}

export default Orderlist