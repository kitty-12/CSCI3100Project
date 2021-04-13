const express = require('express')
const router = express.Router()
const db = require('./database/db')
const mail = require('./mail')
cors = require("cors")
let img = require("./img")
//insert a tag
router.post('/admin/saveArticle', cors(),function (req, res) {
    db.connect()
    db.my_insert(req.query.collection,req.query.content)
    res.send()
})

//like
router.post('/admin/like', cors(),function (req, res) {
    db.connect()
    let info = req.query.likeInfo
    var authid
    var authname
    db.Article.find({_id: info.article_id}), function (err, docs) {
        if (err) {
            return
        }
        authid = docs[0].author._id
        authname = docs[0].author.uname
        docs[0].like.push(req.query.uid)
        db.Article(docs[0]).save(function (err) {
            if (err) {
                res.status(500).send()
                return
            }
        })
    }
    db.User.find(,{_id: info._id}, function (err, docs) {
        if (err) {
            return
        }
        docs[0].liked.push(req.query.article_id)
        db.User(docs[0]).save(function (err) {
            if (err) {
                res.status(500).send()
                return
            }
        })
    })
    db.User.find({_id: authid}, function (err, docs) {
        if (err) {
            return
        }
        docs[0].message.push(authname, 1, 'Someone liked your post!', 'Unread')
        db.User(docs[0]).save(function (err) {
            if (err) {
                res.status(500).send()
                return
            }
            res.send()
        })
    })
})

//editProfile
router.post('/admin/editProfile', cors(),function (req, res) {
    db.connect()
    let info = req.query.userInfo
    db.User.find({_id: info._id}, function (err, docs) {
        if (err) {
            return
        }
        docs[0].user_name = info.user_name
        docs[0].introduction = info.Introduction
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

//collect
router.post('/admin/collect', cors(),function (req, res) {
    db.connect()
    let info = req.query.collectInfo
    var authid
    var authname
    db.User.find({_id: info.user_id}, function (err, docs) {
        if (err) {
            return
        }
        docs[0].collected.push(info.Article_id)
        db.Article(docs[0]).save(function (err) {
            if (err) {
                res.status(500).send()
                return
            }
        })
    })
    db.Article.find({_id: info.article_id}, function (err, docs) {
        if (err) {
            return
        }
        authid = docs[0].author._id
        authname = docs[0].author.uname
        docs[0].collect.push(info.user_name)
        db.Article(docs[0]).save(function (err) {
            if (err) {
                res.status(500).send()
                return
            }
        })
    })
    db.User.find({_id: authid}, function (err, docs) {
        if (err) {
            return
        }
        docs[0].message.push(authname, 2, 'Someone collected your post!', 'Unread')
        db.User(docs[0]).save(function (err) {
            if (err) {
                res.status(500).send()
                return
            }
            res.send()
        })
    })
})

//createComment
router.post('/admin/createComment', cors(),function (req, res) {
    db.connect()
    let info = req.query.commentInfo
    var authid
    var authname
    db.User.find({_id: info.user_id}, function (err, docs) {
        if (err) {
            return
        }
        if (docs[0].is_banned)
            res.send({message:"You are not allowed to comment."})
    })
    db.Article.find({_id: info.article_id}), function (err, docs) {
        if (err) {
            return
        }
        authid = docs[0].author._id
        authname = docs[0].author.uname
        docs[0].comments.aid=info.aid
        docs[0].comments.Time=info.Time
        docs[0].comments.Text=info.Text
        db.Article(docs[0]).save(function (err) {
            if (err) {
                res.status(500).send()
                return
            }
        })
    })
    db.User.find({_id: authid}, function (err, docs) {
        if (err) {
            return
        }
        docs[0].message.push(authname, 3, 'Your post has a new comment!', 'Unread')
        db.User(docs[0]).save(function (err) {
            if (err) {
                res.status(500).send()
                return
            }
            res.send()
        })
    })
})

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
    })
})

//updateArticle
router.post('/admin/updateArticle', cors(),function (req, res) {
    db.connect()
    let info = req.body.articleInformation
    db.Article.find({_id: info._id}, function (err, docs) {
        if (err) {
            return
        }
        docs[0].Tile = info.title
        docs[0].Text = info.text
        docs[0].Status = info.status
        docs[0].tag=info.tag
        docs[0].read=0
        docs[0].like=[]
        docs[0].collect=[]
        if (info.hasImage === "1"){
            docs[0].img.push(img.temp)
        }else{
            docs[0].img.push("默认图片地址")  /// 要改
        }
        if(info.status){ //info.status:0 draft, 1 posted
            docs[0].Post_time=info.time
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
            res.send('1')
        }else{
            res.send('0')
        }
    })
})

//delete
router.post('/admin/delete', cors(),function (req, res) {
    db.connect()
    db.Article.remove({_id: req.query._id}, function (err) {
        if (err) {
            res.status(500).send()
            return
        }
        res.send()
    })
})

//send email
router.post('/admin/sendEmail', function(req, res){
    db.connect()
    let remail = req.body.email;
    let code = mail.send(remail)
    res.send({'code':code})
})

//add new user ？？？
router.post('/admin/addNewUser', function(req, res){
    db.connect()
    let info = req.body.userInfo;
    new db.User(req.body.userInfo).save(function (err) {
        if (err) {
            res.status(500).send()
            return
        }
        res.send()
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

//search
router.post('/admin/search', cors(),function (req, res) {
    db.connect()
    let info = req.body
    var blacklist
    var result=new Array()
    db.User.find({_id: info._id}, function (err,docs) {
        if (err) {
            return
        }
    })
    blacklist=docs[0].black_list
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
    })
    
    db.Article.find({tag},null,{sort: {read:-1}}, function (err,docs) {
        if (err) {
            return
        }
        for (var i = 0; i < docs.length; i++) {
            if (!(blacklist.filter(item => (docs[i].tag).includes(item)))) {
                result.push(docs[i])
            }
        }
        res.send(result)
    })
})

//mainPage_latest
router.post('/admin/mainPage', cors(),function (req, res) {
    db.connect()
    var blacklist
    var result = new Array()
    db.User.find({_id: req.body._id}, function (err, docs) {
        if (err) {
            return
        }
        blacklist = docs[0].black_list
    })
    
    db.Article.find({}, null, {sort: {post_time: -1}}, function (err, docs) {
        if (err) {
            return
        }
        for (var i = 0; i < docs.length; i++) {
            if (!(blacklist.filter(item => (docs[i].tag).includes(item)))) {
                result.push(docs[i])
            }
        }
        res.send(result)

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
    })
    
    db.Article.find({post_time: {$gt: aWeekBefore}}, null, {sort: {read: -1}}, function (err, docs) {
        if (err) {
            return
        }
        for (var i = 0; i < docs.length; i++) {
            if (!(blacklist.filter(item => (docs[i].tag).includes(item)))) {
                result.push(docs[i])
            }
        }
        res.send(result)
    })
})
//articlePage
router.post('/api/admin/articlePage', cors(),function (req, res) {
    db.connect()
    let info = req.body
    db.Article.find({_id: info._id}, function (err, docs) {
        if (err) {
            return
        }
        docs[0].read+=1
        db.Article(docs[0]).save(function (err) {
            if (err) {
                res.status(500).send()
                return
            }
        })
        res.send(docs[0])
    })
})

//articlePage(only comment)
router.post('/api/admin/articlePage', cors(),function (req, res) {
    db.connect()
    let info = req.body
    db.Article.find({_id: info._id}, { comments: 1 },function (err, docs) {
        if (err) {
            return
        }
        res.send(docs[0])
    })
})

//send avatar
router.post('/admin/sendAvatar', cors(),function (req, res) {
    db.connect();
    db.User.find({_id: req.body._id}, function (err, docs){
        if (err) {
            res.status(500).send()
            return
        }
        res.send({'avatar':docs[0].profile.picture})
    })
})

module.exports = router
