const express = require('express')
const router = express.Router()
const db = require('./database/db')
const mail = require('./mail')
cors = require("cors")
let img = require("./img")

// article
//articlePage, article infomation
router.post('/articlePage', cors(),function (req, res) {
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
router.post('/articlePage1', cors(),function (req, res) {
    db.connect()
    let info = req.body
    db.Article.find({_id: info._id}, { comments: 1 },function (err, docs) {
        if (err) {
            return
        }
        res.send(docs[0])
    })
})
//like an article, send a message
router.post('/like', cors(),function (req, res) {
    db.connect()
    let info = req.body
    var authid
    var likername
    var title
    db.Article.find({_id: info.article_id}, function (err, docs) {
        if (err) {
            return
        }
        authid = docs[0].author.author_id
        title = docs[0].title
        if(docs[0].like.includes(info.likerid)){
            res.send("1")
            return
        }else{
            docs[0].like.push(info.likerid)
            db.Article(docs[0]).save(function (err) {
                if (err) {
                    res.status(500).send()
                    return
                }
            })
        }
        db.User.find({_id: info.likerid}, function (err, docs1) {
            if (err) {
                return
            }
            likername = docs1[0].profile.uname
            docs1[0].liked.push(info.article_id)
            db.User(docs1[0]).save(function (err) {
                if (err) {
                    res.status(500).send()
                    return
                }
            })
            db.User.find({_id: authid}, function (err, docs2) {
                if (err) {
                    return
                }
                docs2[0].message.push(likername+" liked"+" your article: "+title)
                db.User(docs2[0]).save(function (err) {
                    if (err) {
                        res.status(500).send()
                        return
                    }
                    res.send('0')
                })
            })
        })
    })
})
//delete an article
router.post('/delete', cors(),function (req, res) {
    db.connect()
    db.Article.remove({_id: req.body._id}, function (err) {
        if (err) {
            res.status(500).send()
            return
        }
        res.send()
    })
})


//collect an article, send a message
router.post('/admin/collect', cors(),function (req, res) {
    db.connect()
    let info = req.body
    var authid
    var collectername
    var title
    db.User.find({_id: info.user_id}, function (err, docs) {
        if (err) {
            return
        }
        if(docs[0].collected.includes(info.article_id)){
            res.send("1")
            return
        }else{
            console.log(docs[0].collected)
            console.log(info)
            docs[0].collected.push(info.article_id)
            db.User(docs[0]).save(function (err) {
                if (err) {
                    res.status(500).send()
                    return
                }
            })
            collectername = docs[0].profile.uname
        }
        db.Article.find({_id: info.article_id}, function (err, docs1) {
            if (err) {
                return
            }
            authid = docs1[0].author.author_id
            title = docs1[0].title
            docs1[0].collect+=1
            db.Article(docs1[0]).save(function (err) {
                if (err) {
                    res.status(500).send()
                    return
                }
            })
            db.User.find({_id: authid}, function (err, docs2) {
                if (err) {
                    return
                }
                docs2[0].message.push(collectername+" collected your post: "+title)
                db.User(docs2[0]).save(function (err) {
                    if (err) {
                        res.status(500).send()
                        return
                    }
                    res.send('0')
                })
            })
        })
    })
})

//create a comment, send a message
router.post('/admin/createComment', cors(),function (req, res) {
    db.connect()
    let info = req.body
    var authid
    var commentername
    var title
    db.User.find({_id: info.user_id}, function (err, docs) {
        if (err) {
            return
        }
        if (docs[0].is_banned){
            res.send({message:"ban"})
            return;
        }


        commentername = docs[0].profile.uname

        db.Article.find({_id: info.article_id}, function (err, docs1) {
            if (err) {
                return
            }
            authid = docs1[0].author.author_id
            title=docs1[0].title
            docs1[0].comments.push(commentername +": "+ info.Text)
            db.Article(docs1[0]).save(function (err) {
                if (err) {
                    res.status(500).send()
                    return
                }
            })
            db.User.find({_id: authid}, function (err, docs2) {
                if (err) {
                    return
                }
                docs2[0].message.push(commentername+" commented your post: "+ title)
                db.User(docs2[0]).save(function (err) {
                    if (err) {
                        res.status(500).send()
                        return
                    }
                    res.send()
                })
            })
        })
    })
})

module.exports = router
