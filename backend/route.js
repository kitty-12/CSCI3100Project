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

//like
router.post('/api/admin/like', cors(),function (req, res) {
    let info = req.query.likeInfo
    var authid
    var authname
    db.my_find("Article",{_id: info.article_id}), function (err, docs) {
        if (err) {
            return
        }
        authid = docs[0].author._id
        authname = docs[0].author.uname
        docs[0].like.append(req.query.uid)
        db.Article(docs[0]).save(function (err) {
            if (err) {
                res.status(500).send()
                return
            }
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
        })
    })
    db.my_find("User",{_id: authid}, function (err, docs) {
        if (err) {
            return
        }
        docs[0].message.append(authname, 1, 'Someone liked your post!', 'Unread')
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
    let info = req.query.collectInfo
    var authid
    var authname
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
        authid = docs[0].author._id
        authname = docs[0].author.uname
        docs[0].collect.append(info.user_name)
        db.Article(docs[0]).save(function (err) {
            if (err) {
                res.status(500).send()
                return
            }
        })
    })
    db.my_find("User",{_id: authid}, function (err, docs) {
        if (err) {
            return
        }
        docs[0].message.append(authname, 2, 'Someone collected your post!', 'Unread')
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
router.post('/api/admin/createComment', cors(),function (req, res) {
    let info = req.query.commentInfo
    var authid
    var authname
    db.my_find("User",{_id: info.user_id}, function (err, docs) {
        if (err) {
            return
        }
        if (docs[0].is_banned)
            res.send({message:"You are not allowed to comment."})
    })
    db.Article.find({_id: info.user_id}, function (err, docs) {
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
    db.my_find("User",{_id: authid}, function (err, docs) {
        if (err) {
            return
        }
        docs[0].message.append(authname, 3, 'Your post has a new comment!', 'Unread')
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
                mail.send(remail)
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

//returnPersonalInfo
router.post('/api/admin/returnPersonalInfo', cors(),function (req, res) {
    let info = req.body
    db.User.findOne({_id: info._id}, function (err, docs) {
        if (err) {
            return
        }
        res.send(docs)
    })
})

//addBlacklist
router.post('/api/admin/addBlacklist', cors(),function (req, res) {
    let info = req.body
    db.User.findOne({_id: info._id}, function (err, docs) {
        if (err) {
            return
        }
        docs[0].black_list=info.tag
        res.send()
    })
})

//search
router.post('/api/admin/search', cors(),function (req, res) {
    let info = req.body
    db.User.find({_id: info._id}, function (err,docs) {
        if (err) {
            return
        }
    })
    if(info.tag){
        db.Article.find({tag:info.tag&&!docs[0].black_list},{sort: {info._sort:1}}, function (err,docs_2) {
        if (err) {
            return
        }
        res.send(docs_2)
        })
    }else if(info.user_name){
        db.Article.find({tag:!docs[0].black_list,author:info.user_name},{sort: {info._sort:1}}, function (err,docs_2) {
        if (err) {
            return
        }
        res.send(docs_2)
        })
    }else{
        db.Article.find({tag:!docs[0],title:info.user_name},{sort: {info._sort:1}}, function (err,docs_2) {
        if (err) {
            return
        }
        res.send(docs_2) 
        }) 
    }
}

module.exports = router
