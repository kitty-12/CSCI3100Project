//npm i nodemailer nodemailer-smtp-transport -save //安装模块

//引入模块
const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')

//创建连接对象
const transport = nodemailer.createTransport(smtpTransport({
    host: 'smtp.aliyun.com', // 服务
    port: 465, // smtp端口 默认无需改动
    secure: true,
    auth: {
      user: 'donuts_team@aliyun.com', // 用户名
      pass: 'donuts0414' // SMTP授权码
    }
}));

//生成随机验证码函数及邮箱验证正则
const randomFns=()=> { // 生成6位随机数
    let code = ""
    for(let i= 0;i<6;i++){
        code += parseInt(Math.random()*10)
    }
    return code 
}
const regEmail=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/ //验证邮箱正则

//建立连接发送验证码
exports.send=function (EMAIL){
  let code=randomFns()
  transport.sendMail({
    from: 'donuts_team@aliyun.com', // 发件邮箱
    to: EMAIL, // 收件列表
    subject: '验证你的电子邮件', // 标题
    html: `
    <p>你好！</p>
    <p>您正在注册账号</p>
    <p>你的验证码是：<strong style="color: #ff4e2a;">${code}</strong></p>
    <p>***该验证码5分钟内有效***</p>` // html 内容
  }, 
  function(error, data) {
    assert(!error,500,"发送验证码错误！")
    transport.close(); // 如果没用，关闭连接池
  })};
//....验证码发送后的相关工作 
//将邮箱和验证码保存到Code中，同时保证这条记录的唯一性。并在5分钟内将这条记录删除
/*const Code = require("../models/Code")
const e_mail = EMAIL
await Code.deleteMany({e_mail}) //删除该旧的验证码，保证该邮箱是最新的验证码有效
const [data] = await Code.insertMany({e_mail,veri_code:code}) //插入新邮箱验证码组合
setTimeout(async ()=>{    //5分钟后删除
    await Code.deleteMany({e_mail})
},1000*60*5)
}else{
    assert(false,422,'请输入正确的邮箱格式！')
}*/
