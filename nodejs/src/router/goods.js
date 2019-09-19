const express = require('express');

const Router = express.Router();

const { insert, remove, find } = require('../db/mongo');

const { formatData } = require('../utils');



// 增：商品数量
Router.post('/plus', async (req, res) => {
    let { username, password, age, gender } = req.body;
    let data
    try {
        //两个参数（colname/数据库名，data/传入的数据）
        insert('goods', { id });//{username,password,age,gender}
        res.send(formatData())
    } catch (err) {
        res.send(formatData({ code: 0 }))
    }
})

// 查（获取所有商品数据）：get /user
Router.get('/', async (req, res) => {
    let { skip, limit, sort } = req.query;
    let data = await find('goods', {}, { skip, limit, sort });
    // console.log(data);

    res.send(formatData({ data }))
})


Router.get('/:id', async (req, res) => {

    let { id } = req.params;
    let data = await find('goods', { _id: id });

    res.send(formatData({ data }))
})

module.exports = Router;