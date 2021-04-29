const express = require('express')
const router = express.Router()
const db = require('./database/db')
const mail = require('./mail')
cors = require("cors")
let img = require("./img")

// plugin

//send avatar
router.post('/sendAvatar', cors(),function (req, res) {
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
router.post('/saveArticle', cors(),function (req, res) {
    db.connect()
    db.my_insert("Tag",req.body)
    res.send()
})
//send email
router.post('/sendEmail', function(req, res){
    db.connect()
    let remail = req.body.email;
    let code = mail.send(remail)
    res.send({'code':code})
})

module.exports = router
