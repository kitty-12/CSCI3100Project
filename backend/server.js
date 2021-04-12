const express = require('express'),
    app = express(),
    expressPort = 3000,
    img = require("./img")
cors = require("cors")
routes = require("./route")


// allow interaction between different host
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,xtoken");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.listen(expressPort,()=>{
    console.log("listening on " + expressPort)
})

app.use("",img)
app.use("/test",routes)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));





