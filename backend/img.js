let express = require('express')
let router = express.Router()
let multer = require('multer')
let fs = require('fs');
let path = require('path');
let temp_img_dir = null
let temp_profile_dir = null
let temp_banner_dir = null
let temp = null

let upload = multer({
    storage: multer.diskStorage({
        //设置文件存储位置
        destination: function(req, file, cb) {
            let date = new Date();
            let year = date.getFullYear();
            let month = (date.getMonth() + 1).toString().padStart(2, '0');
            let day = date.getDate();
            let dir = "./static/" + year + month + day;
            temp = "/static/" + year + month + day


            //判断目录是否存在，没有则创建
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, {
                    recursive: true
                });
            }

            //dir就是上传文件存放的目录
            cb(null, dir);
        },
        //设置文件名称
        filename: function(req, file, cb) {
            let fileName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
            //fileName就是上传文件的文件名
            cb(null, fileName);
        }
    })
});
// upload img
router.post('/upload/img', upload.single('file'), (req, res) => {
    temp_img_dir = temp + "/" + req.file.filename
    res.header("Access-Control-Allow-Origin", "*");
    res.json({
        file: req.file
    })

})

// upload profile
router.post('/upload/profile', upload.single('file'), (req, res) => {
    temp_profile_dir = temp + "/" + req.file.filename
    res.header("Access-Control-Allow-Origin", "*");
    res.json({
        file: req.file
    })

})

// upload banner
router.post('/upload/banner', upload.single('file'), (req, res) => {
    temp_banner_dir = temp + "/" + req.file.filename
    res.header("Access-Control-Allow-Origin", "*");
    res.json({
        file: req.file
    })

})



exports.router = router
exports.temp_img = temp_img_dir
exports.temp_profile = temp_profile_dir
exports.temp_banner = temp_banner_dir
