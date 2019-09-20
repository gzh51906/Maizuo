import axios from 'axios';



async function get(url, params) {
    // console.log(params)
    let { data } = await axios.get(url, { params: params })
    return data
}

let post = () => {

}


let patch = () => {

}

let remove = () => {

}

async function cinema(limit, skip, address) {

    let { data } = await axios.get('http://localhost:1908/cinema/check', { params: { limit, skip: skip * 20 } })
    return data
}
// 区域电影院查询
async function addresscinema(address) {

    let { data } = await axios.get('http://localhost:1908/cinema/check', { params: { address } })
    return data
}


export default {
    get,
    post,
    patch,
    delete: remove,
    cinema,
    addresscinema
}