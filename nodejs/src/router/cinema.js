const express = require('express');

const Router = express.Router();

const { insert, remove, find } = require('../db/mongo');

const { formatData } = require('../utils');

// 获取电影院：get /user
Router.get('/check', async (req, res) => {
    let { skip, limit, sort, asc, address } = req.query;
    console.log({ skip, limit, sort, asc, address })
    let data = await find('cinema', {}, { skip, limit, sort, asc, address });
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