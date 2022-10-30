let express = require('express')
let router = express.Router()
let multer = require('multer')
let fs = require('fs');
let path = require('path');
let temp_img_dir = null
let temp = null

let upload = multer({
    storage: multer.diskStorage({
        // set file storage location
        destination: function(req, file, cb) {
            let date = new Date();
            let year = date.getFullYear();
            let month = (date.getMonth() + 1).toString().padStart(2, '0');
            let day = date.getDate();
            let dir = "./static/" + year + month + day;
            temp = "/static/" + year + month + day


            // create directory if it is not exist
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, {
                    recursive: true
                });
            }
            cb(null, dir);
        },
        // set file name 
        filename: function(req, file, cb) {
            let fileName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
            cb(null, fileName);
        }
    })
});
// upload img
router.post('/img', upload.single('file'), (req, res) => {
    temp_img_dir = temp + "/" + req.file.filename
    res.header("Access-Control-Allow-Origin", "*");
    res.send({
        path: temp_img_dir
    })

})

// upload profile
router.post('/profile', upload.single('file'), (req, res) => {
    temp_img_dir = temp + "/" + req.file.filename
    res.header("Access-Control-Allow-Origin", "*");
    res.send({
        path: temp_img_dir
    })

})

// upload banner
router.post('/banner', upload.single('file'), (req, res) => {
    temp_img_dir = temp + "/" + req.file.filename
    res.header("Access-Control-Allow-Origin", "*");
    res.send({
        path: temp_img_dir
    })

})



exports.router = router
