const express = require('express')
const router = express.Router()
const db = require('./database/db')
const mail = require('./mail')
cors = require("cors")
let img = require("./img")


// main page
//add new user
router.post('/admin/addNewUser', function(req, res){
    db.connect()
    new db.User(req.body.userInfo).save(function (err) {
        if (err) {
            res.status(500).send()
            return
        }
        res.send()
    })
})

//login
router.post('/admin/login', cors(),function (req, res) {
    //console.log("before connect");
    db.connect();
    //console.log("after connect");
    db.User.find({email: req.body.email}, function (err, docs){
        if (err) {
            res.status(500).send()
            return
        }
        if(docs[0].pwd===req.body.pwd) {
            res.send({msg:'1',uid:docs[0]._id})
        }else{
            res.send({msg:'0'})
        }
    })
})
//mainPage_Hot in history
router.post('/admin/mainPage', cors(),function (req, res) {
    db.connect()
    var blacklist
    var result=new Array()
    db.User.find({_id: req.body._id}, function (err,docs) {
        if (err) {
            return
        }
        blacklist=docs[0].black_list
    

        db.Article.find({},null,{sort: {read:-1}}, function (err,docs) {
            if (err) {
                return
            }
            for (var i = 0; i < docs.length; i++) {
                if ((blacklist.filter(item => (docs[i].tag).includes(item))).length===0) {
                    result.push(docs[i])
                }
            }
            res.send(result)
        })
    })
})    

//mainPage_latest
router.post('/admin/mainPage_latest', cors(),function (req, res) {
    db.connect()
    var blacklist
    var result = new Array()
    db.User.find({_id: req.body._id}, function (err, docs) {
        if (err) {
            return
        }
        blacklist = docs[0].black_list

        db.Article.find({}, null, {sort: {post_time: -1}}, function (err, docs) {
            if (err) {
                return
            }
            for (var i = 0; i < docs.length; i++) {
                if ((blacklist.filter(item => (docs[i].tag).includes(item))).length===0) {
                    result.push(docs[i])
                }
            }
            res.send(result)
    
        })
    })
})

//mainPage_hotThiWeek
router.post('/admin/mainPage_hotThiWeek', cors(),function (req, res) {
    db.connect()
    var blacklist
    var result = new Array()
    var aWeekBefore = req.body.date
    db.User.find({_id: req.body._id}, function (err, docs) {
        if (err) {
            return
        }
        blacklist = docs[0].black_list
        
        db.Article.find({post_time: {$gt: aWeekBefore}}, null, {sort: {read: -1}}, function (err, docs) {
            if (err) {
                return
            }
            for (var i = 0; i < docs.length; i++) {
                if ((blacklist.filter(item => (docs[i].tag).includes(item))).length===0) {
                    result.push(docs[i])
                }
            }
            res.send(result)
        })
    })
})
module.exports = router
