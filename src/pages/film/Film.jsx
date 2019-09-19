import React, { Component } from 'react';
import { Carousel, Button } from 'antd';

//引入样式
import './film.css'


class Home extends Component {
    state = {

    }
    render() {
        let data = this.props
        console.log(data);
        return (
            <div className="film">
                <Carousel autoplay>
                    <div>
                        <h3>1</h3>
                    </div>
                    <div>
                        <h3>23</h3>
                    </div>
                </Carousel>

            </div>
        )
    }
}

export default Home;