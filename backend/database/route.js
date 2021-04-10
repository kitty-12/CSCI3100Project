const express = require('express')
const router = express.Router()
const db = require('./db')
const mail = require('./mail')


//insert a tag
router.post('/api/admin/saveArticle', function (req, res) {
    db.my_insert(req.body.collection,req.body.content)
    res.send()
})

//register
router.post('/api/admin/register', function (req, res) {
    //mail.
    res.send()
})

//like
router.post('/api/admin/like', function (req, res) {
    let info = req.body.articleID
    db.Article.find({_id: info.article_id}, function (err, docs) {
        if (err) {
            return
        }
        docs[0].like.append(info.user_name)
        db.post(docs[0]).save(function (err) {
            if (err) {
                res.status(500).send()
                return
            }
            res.send()
        })
    })
    db.User.find({_id: info._id}, function (err, docs) {
        if (err) {
            return
        }
        docs[0].liked.append(info.article_id)
        db.post(docs[0]).save(function (err) {
            if (err) {
                res.status(500).send()
                return
            }
            res.send()
        })
    })
})

//editProfile
router.post('/api/admin/editProfile', function (req, res) {
    let info = req.body.UserInfo
    db.User.find({_id: info._id}, function (err, docs) {
        if (err) {
            return
        }
        docs[0].user_name = info.user_name
        docs[0].Gender = info.Gender
        docs[0].Birth = info.Birth
        docs[0].Introduction = info.Introduction
        docs[0].picture = info.picture
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
router.post('/api/admin/collect', function (req, res) {
    let info = req.body.CollectInfo
    db.User.find({_id: info.user_id}, function (err, docs) {
        if (err) {
            return
        }
        docs[0].Collected.append(info.Article_id)
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
        docs[0].Collect.append(info.user_name)
        db.Article(docs[0]).save(function (err) {
            if (err) {
                res.status(500).send()
                return
            }
            res.send()
        })
    })
})

//createComment
router.post('/api/admin/createComment', function (req, res) {
    let info = req.body.commentInfo
    db.Article.find({_id: info.user_id}, function (err, docs) {
        if (err) {
            return
        }
        docs[0].Comments.aid=info.aid
        docs[0].Comments.Time=info.Time
        docs[0].Comments.Text=info.Text
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
router.post('/api/admin/signin', function (req, res) {
    // req.session.user = req.body.userInfo
    res.send()
})

//createArticle
router.post('/api/admin/createArticle', function (req, res) {
    new db.Article(req.body.articleInformation).save(function (err) {
        if (err) {
            res.status(500).send()
            return
        }
        res.send()
    })
})

//updateArticle
router.post('/api/admin/updateArticle', function (req, res) {
    let info = req.body.articleInformation
    db.Article.find({_id: info._id}, function (err, docs) {
        if (err) {
            return
        }
        docs[0].Tile = info.title
        docs[0].Text = info.text
        docs[0].Status = info.status
        docs[0].Img = info.imag
        if(info.status){
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
router.post('/api/admin/login', function (req, res) {
    let info = req.body.loginInfo
    db.User.find({_id: info._id}, function (err, docs){
        if(docs[0].pwd===info.pwd) {
            res.send(1)
        }else{
            res.send(0)
        }
    })
})

//delete
router.post('/api/admin/delete', function (req, res) {
    db.Article.remove({_id: req.body._id}, function (err) {
        if (err) {
            res.status(500).send()
            return
        }
        res.send()
    })
})


module.exports = router