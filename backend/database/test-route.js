const db = require("./db");
const express = require('express'),
    router = express.Router()


router.get('/insert', function (req, res) {
    db.connect()
    db.my_insert(req.body.collection,req.body.content)
    res.send("good job")
})

module.exports = router



