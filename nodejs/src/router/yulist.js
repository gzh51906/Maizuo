const express = require('express');

const Router = express.Router();

const { insert, remove, find } = require('../db/mongo');

const { formatData } = require('../utils');

// 获取茶语文章：get /user
Router.get('/check', async (req, res) => {
    let { skip, limit, sort, asc } = req.query;
    let data = await find('yulist', {}, { skip, limit, sort, asc });
    // console.log(data);

    res.send(formatData({ data }))
})

//获取茶语商品列表
Router.get('/goodslist', async (req, res) => {
    // console.log("----------------------")
    let { skip, limit, sort, asc } = req.query;
    let data = await find('yugoodslist', {}, { skip, limit, sort, asc });
    // console.log(data);

    res.send(formatData({ data }))
})

//获取评论区信息
Router.get('/goodstalk', async (req, res) => {
    // console.log("----------------------", req.query)
    let { skip, limit, sort, asc } = req.query;

    let data = await find('goodstalk', {}, { skip, limit, sort, asc });
    // console.log(data);

    res.send(formatData({ data }))
})

//根据id获取信息
Router.get('/:id', async (req, res) => {
    // console.log("--------")
    let { id } = req.params;

    let data = await find('yulist', { _id: id });
    res.send(formatData({ data }))
})






module.exports = Router;