import axios from 'axios';

let nanshigou = axios.create({
    baseURL: 'https://www.nanshig.com/mobile/index.php'
})

let film = axios.create({
    baseURL: 'http://localhost:1906/film'
})

let ready_film = axios.create({
    baseURL: 'http://localhost:1906/film/ready_film'
})

async function get(params) {
    let { data } = await nanshigou.get('', {
        params
    })
    return data;
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

export default {
    get,
    post,
    patch,
    delete: remove,
    getFilm,
    getReadyFilm
}