import React, { Component } from 'react';

import ComponentButtom from "../../component/ComponentButtom/ComponentButtom"

class Mine extends React.Component {
    state = {

    };

    render() {

        let data = this.props
        console.log(data);


        return (
            <div>
                wode
                <ComponentButtom />
            </div>
        );
    }
}


export default Mine;