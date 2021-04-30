// import the express framework and middlewares
const express = require('express'),
    bodyParser = require("body-parser");
    app = express(),
    expressPort = 3000,
cors = require("cors") 

// import all routes
article = require("./aritlce")
create_article = require("./create_article")
img = require("./img")
main_page = require("./main_page")
plugin = require("./plugin")
search_result = require("./search_result")
user_page = require("./user_page")
admin = require("./admin")

// allow interaction between different host
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,xtoken");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
// start service
app.listen(expressPort,()=>{
    console.log("listening on " + expressPort)
})

// middleware and express framework
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// assign the routes depending on the functionality
app.use("/api/upload",img.router)
app.use("/api/plugin",plugin)
app.use("/api/article",article)
app.use("/api/create_article",create_article)
app.use("/api/main_page",main_page)
app.use("/api/search_result",search_result)
app.use("/api/user_page",user_page)
app.use("/api/admin",admin)
