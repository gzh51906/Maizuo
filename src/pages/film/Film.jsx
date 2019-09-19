import React, { Component } from 'react';
import { Carousel, Button, Menu, Icon } from 'antd';

//引入样式
import './film.css'

class Home extends Component {
    state = {
        current: "mail"
    }
    handleClick = (e) => {
        let { key } = e
        this.setState({
            current: key
        })
    }
    render() {
        let data = this.props
        console.log(data);
        return (
            <div className="film">
                <Carousel autoplay>
                    <div>
                        <img src={"../../asset/img/lunbo2.jpg"} alt="" style={{ width: 414, height: 231 }} />
                    </div>
                    <div>
                        <img src={"../../asset/img/lunbo1.jpg"} alt="" style={{ width: 414, height: 231 }} />
                    </div>
                </Carousel>
                <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                    <Menu.Item key="mail">
                        正在热映
                    </Menu.Item>
                    <Menu.Item key="setting">
                        即将上映
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}

export default Home;