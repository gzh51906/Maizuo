import axios from 'axios';


let film = axios.create({
    baseURL: 'http://localhost:1906/film'
})

let ready_film = axios.create({
    baseURL: 'http://localhost:1906/film/ready_film'
})



async function get(url, params) {
    // console.log(params)
    let { data } = await axios.get(url, { params })
    return data
}
//获取已经上映的商品的信息
let getFilm = async (params) => {
    let { data } = await film.get("", {
        params: {
            // limit: 10 * 1
        }
    })
    data.data.forEach(element => {
        element.actors = JSON.parse(element.actors)
        element.filmType = JSON.parse(element.filmType)
        element.item = JSON.parse(element.item)
    });

    return data;
}

//获取准备上映的商品的信息
let getReadyFilm = async (params) => {

    let { data } = await ready_film.get("", {
        params: {
        }
    })
    data.data.forEach(element => {
        element.actors = JSON.parse(element.actors)
        element.filmType = JSON.parse(element.filmType)
        element.item = JSON.parse(element.item)
        element.premiereAt = (new Date(element.premiereAt * 1)).toLocaleDateString()
    });

    return data;
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
    addresscinema,
    getFilm,
    getReadyFilm
}