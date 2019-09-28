const express = require('express');

const Router = express.Router();

const { insert, remove, find, update } = require('../db/mongo');

const { formatData } = require('../utils');

// 获取电影院：get /user
Router.get('/check', async (req, res) => {
    let { skip, limit, sort, asc, address } = req.query;
    // console.log({ skip, limit, sort, asc, address })
    let data = await find('cinema', {}, { skip, limit, sort, asc, address });
    // console.log(data);

    res.send(formatData({ data }))
})



//根据id获取信息
Router.get('/id', async (req, res) => {
    // console.log("--------")

    let { _id } = req.query;
    let data = await find('cinema', { _id });
    res.send(formatData({ data }))
})

// 获取影片信息
Router.get('/film', async (req, res) => {
    let { skip, limit, sort, asc, address, _id } = req.query;
    // console.log({ skip, limit, sort, asc, address })
    let data = await find('cinemadetial', {}, { skip, limit, sort, asc, address });
    // console.log(data);

    res.send(formatData({ data }))
})
// 获取播放时间
Router.get('/showtime', async (req, res) => {
    let { skip, limit, sort, asc, address } = req.query;
    // console.log({ skip, limit, sort, asc, address })
    let data = await find('showtime', {}, { skip, limit, sort, asc, address });
    // console.log(data);

    res.send(formatData({ data }))
})
// 获取影片信息
Router.get('/showtime1', async (req, res) => {
    // console.log("--------")

    let { _id } = req.query;
    // console.log({ _id })
    let data = await find('showtime', { _id });
    res.send(formatData({ data }))
})

// 获取影片信息
Router.get('/orderfilm', async (req, res) => {
    // console.log("--------")

    let { _id } = req.query;
    // console.log({ _id })
    let data = await find('cinemadetial', { _id });
    res.send(formatData({ data }))
})
// 更改影厅座位
Router.patch('/upseat', async (req, res) => {
    let { _id, seat } = req.body
    let data = await update('showtime', { _id }, { $set: { seat } })
    res.send(formatData({ data }))
})

// 更改用户订单座位
Router.patch('/upseat', async (req, res) => {
    let { _id, seat } = req.body
    let data = await update('showtime', { _id }, { $set: { seat } })
    res.send(formatData({ data }))
})

// 根据ID获取用户订单列表
Router.get('/usergoods', async (req, res) => {
    // console.log("--------")

    let { _id } = req.query;
    // console.log({ _id })
    let data = await find('user', { _id });
    res.send(formatData({ data }))
})

// 根据ID更改用户订单
Router.patch('/upuser', async (req, res) => {
    let { _id, oderlist } = req.body
    // console.log({ _id, name, address, districtName, phone, lowPrice, notice })
    let data = await update('user', { _id }, { $set: { oderlist } })
    res.send(formatData({ data }))
})
// 取消订单
Router.patch('/uporedelist', async (req, res) => {
    let { phone, oderlist } = req.body
    // console.log({ _id, name, address, districtName, phone, lowPrice, notice })
    let data = await update('user', { phone }, { $set: { oderlist } })
    res.send(formatData({ data }))
})


module.exports = Router;