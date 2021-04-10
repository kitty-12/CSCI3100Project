const db = require("./db");
const express = require('express'),
    router = express.Router()
const cors = require("cors");


router.get('/insert', cors(),function (req, res) {
    db.connect()
    db.my_insert("Tag",{name:"good job"})
    res.send("good job")
})

module.exports = router


