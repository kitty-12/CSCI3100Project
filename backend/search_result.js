const express = require('express')
const router = express.Router()
const db = require('./database/db')
const mail = require('./mail')
cors = require("cors")
let img = require("./img")
// search result
//search a keyword, return articles whose title or author name includes the keyword, rank by read or time
router.post('/search', cors(),function (req, res) {
    db.connect()
    let info = req.body
    console.log(info)
    var blacklist
    var result=new Array()
    db.User.find({_id: info._id}, function (err,docs) {
        if (err) {
            return (err)
        }
        blacklist=docs[0].black_list
    })
    /*
    if(info.tag){
        db.Article.find({tag:info.tag},{sort: {read:-1}}, function (err,docs_2) {
            if (err) {
                return
            }
            for(var i=0; i<docs.length; i++){
                if(!(blacklist.filter(item=>(docs[i].tag).includes(item)))){
                    result.push(docs_2[i])
                }
            }
            res.send(result)
        })
    }else if(info.user_name){
        db.Article.find({author:info.user_name},{sort: {read:-1}}, function (err,docs_2) {
            if (err) {
                return
            }
            for(var i=0; i<docs.length; i++){
                if(!(blacklist.filter(item=>(docs[i].tag).includes(item)))){
                    result.push(docs_2[i])
                }
            }
            res.send(result)
        })
    }else{
        db.Article.find({title:info.title},{sort: {read:-1}}, function (err,docs_2) {
            if (err) {
                return
            }
            for(var i=0; i<docs.length; i++){
                if(!(blacklist.filter(item=>(docs[i].tag).includes(item)))){
                    result.push(docs_2[i])
                }
            }
            res.send(result)
        })
    }
    */
    let filter={
        $or:[
            {"author.uname":{$regex:info.key}},
            {"title":{$regex:info.key}},
        ]
    }
    if(info.criterion=="1"){//by read
        db.Article.find(filter,null,{sort: {read:-1}}, function (err,docs_2) {
            console.log(docs_2)
            if (err) {
                return (err)
            }
            for(var i=0; i<docs_2.length; i++){
                if((blacklist.filter(item=>(docs_2[i].tag).includes(item))).length===0){
                    result.push(docs_2[i])
                }
            }
            console.log(result)
            res.send(result)
        })
    }else{//by time
        db.Article.find(filter,null,{sort: {post_time:-1}}, function (err,docs_2) {
            if (err) {
                return (err)
            }
            for(var i=0; i<docs_2.length; i++){
                if((blacklist.filter(item=>(docs_2[i].tag).includes(item))).length===0){
                    result.push(docs_2[i])
                }
            }
            res.send(result)
        })
    }
})
module.exports = router
