const express = require('express')
const router = express.Router()
const db = require('./database/db')
const mail = require('./mail')
cors = require("cors")
let img = require("./img")

// plugin

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
//insert a tag
router.post('/admin/saveArticle', cors(),function (req, res) {
    db.connect()
    db.my_insert(req.query.collection,req.query.content)
    res.send()
})
//send email
router.post('/admin/sendEmail', function(req, res){
    db.connect()
    let remail = req.body.email;
    let code = mail.send(remail)
    res.send({'code':code})
})

module.exports = router