const express = require('express')
const router = express.Router()
const db = require('./database/db')
const mail = require('./mail')
cors = require("cors")
let img = require("./img")

// article
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
//like
router.post('/admin/like', cors(),function (req, res) {
    db.connect()
    let info = req.query.likeInfo
    var authid
    var likername
    db.Article.find({_id: info.article_id}), function (err, docs) {
        if (err) {
            return
        }
        authid = docs[0].author._id
        docs[0].like.push(req.query.uid)
        db.Article(docs[0]).save(function (err) {
            if (err) {
                res.status(500).send()
                return
            }
        })
    }
    db.User.find({_id: info._id}, function (err, docs) {
        if (err) {
            return
        }
        likername = docs[0].author.uname
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
        docs[0].message.push(likername, info.article_id, 1, 'Someone liked your post!')
        db.User(docs[0]).save(function (err) {
            if (err) {
                res.status(500).send()
                return
            }
            res.send()
        })
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


//collect
router.post('/admin/collect', cors(),function (req, res) {
    db.connect()
    let info = req.query.collectInfo
    var authid
    var collectername
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
        collectername = docs[0].author.uname
    })
    db.Article.find({_id: info.article_id}, function (err, docs) {
        if (err) {
            return
        }
        authid = docs[0].author._id
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
        docs[0].message.push(collectername, info.article_id, 2, 'Someone collected your post!')
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
    var commentername
    db.User.find({_id: info.user_id}, function (err, docs) {
        if (err) {
            return
        }
        if (docs[0].is_banned)
            res.send({message:"You are not allowed to comment."})
        commentername = docs[0].author.uname
    })
    db.Article.find({_id: info.article_id}, function (err, docs) {
        if (err) {
            return
        }
        authid = docs[0].author._id
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
        docs[0].message.push(commentername, info.article_id, 3, 'Your post has a new comment!')
        db.User(docs[0]).save(function (err) {
            if (err) {
                res.status(500).send()
                return
            }
        res.send()
    })
})
})

module.exports = router
