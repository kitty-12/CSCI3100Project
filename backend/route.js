const express = require('express')
const router = express.Router()
const db = require('./database/db')
const mail = require('./mail')
cors = require("cors")

//insert a tag
router.post('/api/admin/saveArticle', cors(),function (req, res) {
    db.my_insert(req.query.collection,req.query.content)
    res.send()
})

//register
router.post('/api/admin/register', cors(),function (req, res) {
    //mail.
    res.send()
})

//like
router.post('/api/admin/like', cors(),function (req, res) {
    db.my_find("Article",{_id: req.query.article_id}), function (err, docs) {
        if (err) {
            return
        }
        docs[0].like.append(req.query.uid)
        db.Article(docs[0]).save(function (err) {
            if (err) {
                res.status(500).send()
                return
            }
            res.send()
        })
    }
    db.my_find("User",{_id: info._id}, function (err, docs) {
        if (err) {
            return
        }
        docs[0].liked.append(req.query.article_id)
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
router.post('/api/admin/editProfile', cors(),function (req, res) {
    let info = req.query.UserInfo
    db.User.find({_id: info._id}, function (err, docs) {
        if (err) {
            return
        }
        docs[0].user_name = info.user_name
        docs[0].introduction = info.Introduction
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
router.post('/api/admin/collect', cors(),function (req, res) {
    let info = req.query.CollectInfo
    db.User.find({_id: info.user_id}, function (err, docs) {
        if (err) {
            return
        }
        docs[0].collected.append(info.Article_id)
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
        docs[0].collect.append(info.user_name)
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
router.post('/api/admin/createComment', cors(),function (req, res) {
    let info = req.query.commentInfo
    db.Article.find({_id: info.user_id}, function (err, docs) {
        if (err) {
            return
        }
        docs[0].comments.aid=info.aid
        docs[0].comments.Time=info.Time
        docs[0].comments.Text=info.Text
        db.Article(docs[0]).save(function (err) {
            if (err) {
                res.status(500).send()
                return
            }
            res.send()
        })
    })
})


//createArticle
router.post('/api/admin/createArticle', cors(),function (req, res) {
    new db.Article(req.query.articleInformation).save(function (err) {
        if (err) {
            res.status(500).send()
            return
        }
        res.send()
    })
})

//updateArticle
router.post('/api/admin/updateArticle', cors(),function (req, res) {
    let info = req.query.articleInformation
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
router.post('/api/admin/login', cors(),function (req, res) {
    let info = req.query.loginInfo
    db.User.find({_id: info._id}, function (err, docs){
        if(docs[0].pwd===info.pwd) {
            res.send(1)
        }else{
            res.send(0)
        }
    })
})

//delete
router.post('/api/admin/delete', cors(),function (req, res) {
    db.Article.remove({_id: req.query._id}, function (err) {
        if (err) {
            res.status(500).send()
            return
        }
        res.send()
    })
})

//register
router.get('/', function(req, res){
    res.send({message:"Click and send code to your email"});
});
//
router.post('/', function(req, res){
    let username = req.body.username || '',
        password = req.body.password,
        sid = req.body.sid,
        code = req.body.code;
        remail = req.body.email;
    
    db.User.find({email:remail}, function(results){
        if( results.length > 0 ){  // has registed
            if( results[0].state === 1){
                res.send({message: "You have registed, please log in"});
            }
            else 
            {
                mail.send()
                if( results[0].code != code ){ // wrong code
                    res.send({message: "Wrong code, please check or send it again"});
                }
                else{
                    new db.User(req.body.userInfo).save(function (err) {
                        if (err) {
                            res.status(500).send()
                            return
                        }
                    res.send()
                    });
                }
            }
        }
    });
});

module.exports = router
