const express = require('express');

const Router = express.Router();

const { insert, remove, find, update } = require('../db/mongo');

const { formatData } = require('../utils');



// 增：购物车数量
Router.post('/', async (req, res) => {
    let { src,content,price,pkid } = req.body;
    let { skip, limit, sort } = req.query;
    let data 
    try {
        data = await find('cartlist', {pkid}, { skip, limit, sort }); 
        if(data.length==0){
            insert('cartlist', { src,content,price,pkid,qty:1,num: true });
            res.send(formatData())
        }else{
            let idx = (data[0].qty*1+1)+"";           
            update('cartlist', {pkid: pkid}, {$set:{qty:idx}})
            res.send(formatData({ code: 0 })) 
        }

    } catch (err) {
        res.send(formatData({ code: 0 }))
    } 
})

// 改
Router.patch('/', async(req, res) => {
    let { qty,pkid,num } = req.body;
    update('cartlist', {pkid: pkid}, {$set:{qty:qty,num:num}})
    res.send({qty,pkid,num})
    
})

// 删
Router.delete('/', async(req, res) => {
    let { num } = req.params;
    try {
        if(num = true){
            remove('cartlist', { num: num })
            res.send(formatData())
        }
    } catch (err) {
        res.send(formatData({ code: 0 }))
    }
})

// 查（获取所有用户）：get /user
Router.get('/', async (req, res) => {
    let { skip, limit, sort } = req.query;
    let data = await find('cartlist', {}, { skip, limit, sort });
    res.send(formatData({ data }))
})

Router.get('/:id', async (req, res) => {
    let { id } = req.params;
    let data = await find('cartlist', { _id: id });
    res.send(formatData({ data }))
})

module.exports = Router;