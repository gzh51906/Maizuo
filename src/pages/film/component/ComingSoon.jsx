import React, { Component } from 'react';

import { List, Typography, Button, message, Avatar, Spin } from 'antd';

import Api from '../../../api'

import "./nowplaying.css"

import InfiniteScroll from 'react-infinite-scroller';

class Comingsoon extends Component {
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
        let { data } = await Api.getReadyFilm()

        return data
    }

    handleInfiniteOnLoad = () => {
        let { data } = this.state;
        console.log(data);

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
    componentWillUnmount() {
        // 卸载异步操作设置状态
        this.setState = (state, callback) => {
            return;
        }
    }
    render() {
        return (
            <div className="nowplaying">
                <div className="demo-infinite-container">
                    <InfiniteScroll
                        initialLoad={false}
                        pageStart={0}
                        loadMore={this.handleInfiniteOnLoad}
                        hasMore={!this.state.loading && this.state.hasMore}
                        useWindow={false}
                    >
                        <List
                            dataSource={this.state.data}
                            renderItem={item => (
                                <List.Item
                                    key={item._id}
                                    style={{ height: 124, width: "100%" }}
                                >
                                    <div className="img_box">
                                        <img src={item.poster} alt="" style={{ width: 66, height: 90 }} />
                                    </div>
                                    <div className="content">
                                        <div className="title">
                                            <span className="t_name">{item.name}</span>
                                            <span className="t_item">{item.filmType.name}</span>
                                        </div>
                                        {item.grade ? < div > 观众评分:{item.grade}</div> : <div>观众评分:无</div>}
                                        <div className="n_actors">
                                            <span>
                                                主演：{item.actors.map(item => {
                                                    return item.name
                                                }).join("  ")}
                                            </span>
                                        </div>
                                        <div>
                                            <span>
                                                上映日期：{
                                                    (item.premiereAt)
                                                }
                                            </span>
                                        </div>
                                    </div>

                                    <Button>购票</Button>

                                </List.Item>
                            )}
                        >
                            {this.state.loading && this.state.hasMore && (
                                <div className="demo-loading-container">
                                    <Spin />
                                </div>
                            )}
                        </List>
                    </InfiniteScroll>
                </div>
            </div>
        );
    }
}

export default Comingsoon;