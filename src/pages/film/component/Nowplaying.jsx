import React, { Component } from 'react';

import { List, Typography, Button, message, Avatar, Spin } from 'antd';

import Api from '../../../api'

import "./nowplaying.css"

import InfiniteScroll from 'react-infinite-scroller';



class Nowplaying extends Component {
    state = {
        data: [],
        loading: false,
        hasMore: true,
    }
    async componentDidMount() {
        let data = await this.getflimdata();
        console.log(data);

        this.setState({
            data,
        })
    }
    getflimdata = async () => {
        let { data } = await Api.getFilm()

        return data
    }

    goto = (id, item, e) => {
        console.log(item);

        this.props.history.push({ pathname: `/filmdetail/${id}`, query: { data: item } })
    }
    bgoto = (id, e) => {
        e.stopPropagation();
        console.log(1231231);

    }
    handleInfiniteOnLoad = () => {
        let { data } = this.state;
        this.setState({
            loading: true,
        });
        if (data.length > 10) {
            message.warning('Infinite List loaded all');
            this.setState({
                hasMore: false,
                loading: false,
            });
            return;
        }
        let filmdata = this.getflimdata()
        this.setState({
            data: filmdata,
            loading: false
        })
    }
    render() {
        return (
            <div className="nowplaying">
                <div className="demo-infinite-container">
                    {/* <InfiniteScroll
                        initialLoad={false}
                        pageStart={0}
                        loadMore={this.handleInfiniteOnLoad}
                        hasMore={!this.state.loading && this.state.hasMore}
                        useWindow={false}
                    > */}
                    <List
                        dataSource={this.state.data}
                        renderItem={item => (
                            <List.Item
                                key={item._id}
                                style={{ height: 124, width: "100%" }}
                                onClick={this.goto.bind(this, item.filmId, item)}
                            >
                                <div className="img_box" >
                                    <img src={item.poster} alt="" style={{ width: 66, height: 90 }} />
                                </div>
                                <div className="content">
                                    <div className="title">
                                        <span className="t_name">{item.name}</span>
                                        <span className="t_item">{item.filmType.name}</span>
                                    </div>
                                    {item.grade ? < div > 观众评分:{item.grade}</div> : <div>观众评分:无</div>}
                                    <div>
                                        <span>
                                            主演：{item.actors.map(item => {
                                                return item.name
                                            }).join("  ")}
                                        </span>
                                    </div>
                                    <div>
                                        <span>
                                            {item.nation} | {item.runtime} 分钟
                                            </span>
                                    </div>
                                </div>

                                <Button
                                    onClick={this.bgoto.bind(this, item._id)}
                                >购票</Button>

                            </List.Item>
                        )}
                    >
                        {this.state.loading && this.state.hasMore && (
                            <div className="demo-loading-container">
                                <Spin />
                            </div>
                        )}
                    </List>
                    {/* </InfiniteScroll> */}
                </div>
            </div>
        )
    }
}
export default Nowplaying;
