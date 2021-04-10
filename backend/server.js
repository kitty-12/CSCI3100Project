const express = require('express'),
    app = express()
    expressPort = 3000
    routes = require("./route")


app.listen(expressPort,()=>{
    console.log("listening on " + expressPort)
})

app.use("/test",routes)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));