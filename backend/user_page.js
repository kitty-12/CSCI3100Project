const express = require('express')
const router = express.Router()
const db = require('./database/db')
const mail = require('./mail')
cors = require("cors")
let img = require("./img")

// user page
//editProfile
router.post('/admin/editProfile', cors(),function (req, res) {
    db.connect()
    let info = req.body
    db.User.find({_id: info._id}, function (err, docs) {
        if (err) {
            return
        }
        docs[0].user_name = info.user_name
        docs[0].introduction = info.introduction
        docs[0].picture = info.picture
        docs[0].banner = info.banner
        db.User(docs[0]).save(function (err) {
            if (err) {
                res.status(500).send()
                return
            }
            res.send()
        })
    })
})

//returnPersonalInfo
router.post('/admin/returnPersonalInfo', cors(),function (req, res) {
    db.connect()
    let info = req.body
    db.User.findOne({_id: info._id}, function (err, docs) {
        if (err) {
            return
        }
        res.send(docs)
    })
})

//returnPersonalArtical
router.post('/admin/returnPersonalArtical', cors(),function (req, res) {
    db.connect()
    let info = req.body
    db.Article.find({author_id: info._id}, ['_id','title','img'], function (err, docs) {
        if (err) {
            return
        }
        res.send({_id:docs._id,title:docs.title,img:docs.img})
    })
})
//returnCollectedArtical
router.post('/admin/returnCollectedArtical', cors(),function (req, res) {
    db.connect()
    let info = req.body
    db.User.findOne({_id: info._id}, function (err, docs) {
        if (err) {
            return
        }
        db.Article.find({_id: {$in:docs.collected}},['_id','title','img'], function (err, docs_2) {
            if (err) {
                return
            }
            res.send({_id:docs_2._id,title:docs_2.title,img:docs_2.img})
        })
    })
})
//returnMessage
router.post('/admin/returnMessage', cors(),function (req, res) {
    db.connect()
    let info = req.body
    db.User.findOne({_id: info._id}, function (err, docs) {
        if (err) {
            return
        }
        res.send(docs.message.splice(0,docs.message.length))
        db.User(docs).save(function (err) {
            if (err) {
                res.status(500).send()
                return
            }
        })
    })
})
//addBlacklist
router.post('/admin/addBlacklist', cors(),function (req, res) {
    db.connect()
    let info = req.body
    db.User.findOne({_id: info._id}, function (err, docs) {
        if (err) {
            return
        }
        docs[0].black_list=info.tag
        db.User(docs[0]).save(function (err) {
            if (err) {
                res.status(500).send()
                return
            }
        })
        res.send()
    })
})

module.exports = router
