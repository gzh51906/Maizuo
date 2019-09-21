import React, { Component } from 'react';

import { Route, Redirect, Switch, withRouter } from 'react-router-dom';

import { Carousel, Button } from 'antd';

class filmDetail extends Component {
    state = {
        data: {}
    }
    componentDidMount() {
        let { data } = this.props.location.query
        this.setState({
            data,
        })
    }
    render() {
        console.log(this.state.data, 1111);
        return (
            <div className="detail">
                detail
            </div>
        )
    }
}
export default filmDetail;