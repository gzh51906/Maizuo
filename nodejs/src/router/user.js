const express = require('express');

const Router = express.Router();

const { insert, remove, find } = require('../db/mongo');
const { formatData, token } = require('../utils')


//验证用户是否存在 并 注册用户 生成令牌
Router.post('/regcheck', async (req, res) => {
    let { phone } = req.body;

    let datacheck, datareg

    //验证用户是否存在
    datacheck = await find('user', { phone });//{phone}
    datacheck = datacheck[0];

    //生成token，并返回前端
    let authorization = token.create(phone);

    if (datacheck) {
        //用户存在
        res.send(formatData({
            code: 1,
            data: {
                _id: datacheck._id,
                phone: datacheck.phone,
                authorization
            }
        }))

    } else {
        //用户不存在，注册用户
        await insert('user', { phone });

        //获取用户信息返回
        datareg = await find('user', { phone });
        datareg = datareg[0]

        res.send(formatData({
            code: 1,
            data: {
                _id: datareg._id,
                phone: datareg.phone,
                authorization
            }
        }))
    }


})

//验证登录及密码 
Router.post('/login', async (req, res) => {
    let { phone, password } = req.body;
    console.log(phone, password, 123444);
    let data
    try {
        //使用查找方法，查询数据库
        data = await find('user', { phone });
        //返回的data是一个数据，所以只需要获取第一个索引值就行了
        data = data[0]
        console.log(data);


        //生成token，并返回前端
        let authorization = token.create(phone);

        if (data) {

            let { _id, phone, avatar, nickname, orderlist } = data
            if (data.password == password) {
                res.send(formatData({ data: { _id, phone, authorization, avatar, nickname, orderlist } }))
            } else {
                res.send(formatData({ code: 0, data: { phone } }))
            }
            //返回数据，返回id，username
        } else {
            //登陆失败就添加code=0
            res.send(formatData({ code: 0 }))
        }
    } catch (err) {
        res.send(formatData({ code: 0 }))
    }
})

// 增：注册用户
Router.post('/reg', async (req, res) => {
    let { phone } = req.body;


    let data
    try {
        insert('users', { phone });
        // { username, password, age, gender }

        //生成token，并返回前端
        let authorization = token.create(phone);
        res.send(formatData({ data: { authorization } }))
        // res.send("111111")
    } catch (err) {
        res.send(formatData({ code: 0 }))
    }
})

// 验证用户名是否存在
Router.get('/check', async (req, res) => {
    let { phone } = req.query;
    let data
    try {
        data = await find('users', { phone });//{username,password,age,gender}
        data = data[0];

        //生成token，并返回前端
        let authorization = token.create(phone);
        if (data) {
            res.send(formatData({ code: 0, data: { authorization } }))
        } else {
            res.send(formatData())
        }
    } catch (err) {
        res.send(formatData({ code: 0 }))
    }
})



// 删
Router.delete('/:id', (req, res) => {
    let { id } = req.params;
    let data
    try {
        remove('user', { _id: id })
        res.send(formatData())
    } catch (err) {
        res.send(formatData({ code: 0 }))
    }
})

// 查（获取所有用户）：get /user
Router.get('/', async (req, res) => {
    let { skip, limit, sort } = req.query;
    let data = await find('user', {}, { skip, limit, sort });
    res.send(formatData({ data }))
})
Router.get('/:id', async (req, res) => {
    let { id } = req.params;
    let data = await find('user', { _id: id });
    res.send(formatData({ data }))
})

module.exports = Router;