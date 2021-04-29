const express = require('express')
const router = express.Router()
const db = require('./database/db')
cors = require("cors")

// Forbid a user to comment
router.get('/ban', cors(),function (req, res) {
    db.connect()
    console.log("req: ", req)
    console.log(req.query)
    db.User.update({email: req.query.input1},{is_banned:true}, function (err) {
        if (err) {
            console.log(err)
            return
        }

        res.send()
    })
})

// Send a notification to all users
router.get('/announce', cors(),function (req, res) {
    db.connect()
    console.log(req.query)
    db.User.updateMany( {$push:{message: "Admin has posted a new announcement: " + req.query.input2}},function (err, docs) {
        if (err) {
            console.log(err)
            return
        }
        res.send()

    })
})

module.exports = router
