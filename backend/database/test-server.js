const express = require('express'),
    app = express()
    expressPort = 3000
    routes = require("./test-route")

app.listen(expressPort,()=>{
    console.log("listening on" + expressPort)
})

app.use("/test",routes)