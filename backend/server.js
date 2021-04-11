const express = require('express'),
    app = express()
    expressPort = 3000
    routes = require("./route")
const img = require("./img")





app.listen(expressPort,()=>{
    console.log("listening on " + expressPort)
})

app.use("/test",routes)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/',img, express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: '/tmp/'}).array('image'));