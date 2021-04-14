const express = require('express')
const router = express.Router()
const db = require('./database/db')
const mail = require('./mail')
cors = require("cors")
let img = require("./img")

// create article
//createArticle
router.post('/admin/createArticle', cors(),function (req, res) {
    db.connect()
    let article= new db.Article(req.body.articleInformation)
    article.save(function (err) {
        if (err) {
            res.status(500).send()
            return
        }
        res.send(article._id)
        db.User.find({_id: req.body._id}, function (err, docs) {
            if (err) {
                return
            }
            docs[0].post.push(article._id)
        })
    })    
})

//updateArticle
router.post('/admin/updateArticle', cors(),function (req, res) {
    db.connect()
    let info = req.body
    console.log(info)
    db.Article.find({_id: info._id}, function (err, docs) {
        if (err) {
            return
        }
        docs[0].title = info.title
        docs[0].text = info.text
        docs[0].status = info.status
        docs[0].tag=info.tag
        docs[0].read=0
        docs[0].like=[]
        docs[0].collect=0
        if (info.hasImage !== '0'){
            docs[0].img = info.img
        }else{
            docs[0].img = "/static/img/default.jpg"  /// default img
        }
        if(info.status){ //info.status:0 draft, 1 posted
            docs[0].post_time=info.time
        }
        db.Article(docs[0]).save(function (err) {
            if (err) {
                res.status(500).send()
                return
            }
            res.send()
        })
    })
})

module.exports = router
