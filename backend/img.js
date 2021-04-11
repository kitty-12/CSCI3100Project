const express = require('express');
const img = express().Router();
const multer = require('multer');
const db = require("./database/db")
const fs = require('fs')
const cors = require("cors");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./static/" + req);    // 保存的路径，备注：需要自己创建
    },
    filename: function (req, file, cb) {
        // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
        cb(null, file.fieldname + '-' + Date.now());
    }
});

// upload img


// 通过 storage 选项来对 上传行为 进行定制化
const upload = multer({ storage: storage })

// 单图上传
img.post('/upload', cors(),upload.array('logo'), function(req, res){
    const file = req.file;
    res.send({ret_code: '0'});
});

img.get('/form', cors(),function(req, res, next){
    const form = fs.readFileSync('localhost:8080/makeDojins', {encoding: 'utf8'});
    res.send(form);
});


// fetch img
img.post('', cors(),function (req, res) {
    db.Article.remove({_id: req.query._id}, function (err) {
        if (err) {
            res.status(500).send()
            return
        }
        res.send()
    })
})

// fetch profile
img.post('', cors(),function (req, res) {
    db.Article.remove({_id: req.query._id}, function (err) {
        if (err) {
            res.status(500).send()
            return
        }
        res.send()
    })
})
img.use
module.exports = img