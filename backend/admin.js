const express = require('express')
const router = express.Router()
const db = require('./database/db')
cors = require("cors")

// Forbid a user to comment
router.post('/admin/ban', cors(),function (req, res) {
    db.connect()
    db.User.update({email: req.body},{is_banned:true}, function (err) {
        if (err) {
            console.log(err)
            return
        }
    })
})

// Send a notification to all users
router.post('/admin/announce', cors(),function (req, res) {
    db.connect()
    db.User.updateMany( {$push:{message: "Admin has posted a new announcement: " + req.body}},function (err, docs) {
        if (err) {
            console.log(err)
            return
        }

    })
})

module.exports = router
