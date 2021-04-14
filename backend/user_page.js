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
        docs[0].profile.user_name = info.uname
        docs[0].profile.introduction = info.introduction
        docs[0].profile.picture = info.profile
        docs[0].profile.banner = info.banner
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
        res.send(docs)
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
            res.send(docs_2)
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
        docs.black_list.push(info.tag)
        db.User(docs).save(function (err) {
            if (err) {
                res.status(500).send()
                return
            }
        })
        res.send()
    })
})

module.exports = router
