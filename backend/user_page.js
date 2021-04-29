const express = require('express')
const router = express.Router()
const db = require('./database/db')
const mail = require('./mail')
cors = require("cors")
let img = require("./img")

// user page
//editProfile
router.post('/editProfile', cors(),function (req, res) {
    db.connect()
    let info = req.body
    console.log(info)
    db.User.find({_id: info._id}, function (err, docs) {
        if (err) {
            return
        }
        console.log(docs[0])
        docs[0].profile.uname = info.uname
        docs[0].profile.introduction = info.introduction
        docs[0].profile.picture = info.picture
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
router.post('/returnPersonalInfo', cors(),function (req, res) {
    db.connect()
    let info = req.body
    db.User.findOne({_id: info._id}, function (err, docs) {
        if (err) {
            return
        }
        console.log(docs)
        res.send(docs)

    })
})

//returnPersonalArtical
router.post('/returnPersonalArtical', cors(),function (req, res) {
    db.connect()
    let info = req.body
    console.log(info)
    db.Article.find({"author.author_id": info._id},  function (err, docs) {
        if (err) {
            return
        }
        //console.log(docs.length)
        res.send(docs)
    })
})
//returnCollectedArtical
router.post('/returnCollectedArtical', cors(),function (req, res) {
    db.connect()
    let info = req.body
    console.log(info._id)
    db.User.findOne({_id: info._id}, function (err, docs) {
        if (err) {
            return
        }
        console.log("user ",docs)
        db.Article.find({_id: {$in:docs.collected}},['_id','title','img'], function (err, docs_2) {
            if (err) {
                return
            }
            //console.log(docs_2)
            res.send(docs_2)
        })
    })
})
//returnMessage
router.post('/returnMessage', cors(),function (req, res) {
    db.connect()
    let info = req.body
    console.log(req.body)
    db.User.findOne({_id: info._id}, function (err, docs) {
        if (err) {
            return
        }
        res.send(docs.message.splice(0,docs.message.length))
        db.User(docs).save(function (err) {
            if (err) {
                //res.status(500).send()
                return
            }
        })
    })
})
//addBlacklist
router.post('/addBlacklist', cors(),function (req, res) {
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
