import React, { Component } from 'react';

import './information.css';

class Information extends Component {
    state = {
        smallimgdata: [
            "../../asset/inforImg/small1.jpg",
            "../../asset/inforImg/small2.jpg",
            "../../asset/inforImg/small3.jpg",
            "../../asset/inforImg/small4.jpg",
            "../../asset/inforImg/small5.jpg",
            "../../asset/inforImg/small6.jpg",
            "../../asset/inforImg/small7.jpg",
            "../../asset/inforImg/small8.jpg",
            "../../asset/inforImg/small9.jpg",
            "../../asset/inforImg/small10.jpg"
        ]
    }

    render() {
        let data = this.props
        console.log(data);

        return (
            <div className='information'>
                <img src="../../asset/inforImg/empty.jpg" alt="" />

                <a href="https://mp.weixin.qq.com/s/veF_gkORY_ui8WtObXAJQw">
                    <img src="../../asset/inforImg/big.jpg" alt="" />
                </a>
                <img src="../../asset/inforImg/middle1.jpg" alt="" />
                <img src="../../asset/inforImg/home.jpg" alt="" />
                <img src="../../asset/inforImg/line.jpg" alt="" />
                <img src="../../asset/inforImg/samll1.jpg" alt="" />
                <img src="../../asset/inforImg/goodpart.jpg" alt="" />
                <img src="../../asset/inforImg/line.jpg" alt="" />
                <img src="../../asset/inforImg/samll2.jpg" alt="" />
                <img src="../../asset/inforImg/line.jpg" alt="" />
                <img src="../../asset/inforImg/samll3.jpg" alt="" />
                <img src="../../asset/inforImg/line.jpg" alt="" />
                <img src="../../asset/inforImg/samll4.jpg" alt="" />
                <img src="../../asset/inforImg/line.jpg" alt="" />
                <img src="../../asset/inforImg/samll5.jpg" alt="" />
                <img src="../../asset/inforImg/line.jpg" alt="" />
                <img src="../../asset/inforImg/samll6.jpg" alt="" />
                <img src="../../asset/inforImg/line.jpg" alt="" />
                <img src="../../asset/inforImg/samll7.jpg" alt="" />
                <img src="../../asset/inforImg/line.jpg" alt="" />
                <img src="../../asset/inforImg/samll8.jpg" alt="" />
                <img src="../../asset/inforImg/line.jpg" alt="" />
                <img src="../../asset/inforImg/samll9.jpg" alt="" />
                <img src="../../asset/inforImg/line.jpg" alt="" />
                <img src="../../asset/inforImg/samll10.jpg" alt="" />
                <img src="../../asset/inforImg/end.jpg" alt="" />
            </div>
        )
    }
}


export default Information;