//npm i nodemailer nodemailer-smtp-transport -save //Install models

//Import models
const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')

//Create connect object
const transport = nodemailer.createTransport(smtpTransport({
    host: 'smtp.aliyun.com', // 
    port: 465, // smtp
    secure: true,
    auth: {
      user: 'donuts_team@aliyun.com', // username of email
      pass: 'donuts0414' // SMTP
    }
}));

//Generate random verification code function
const randomFns=()=> { // Generate 6-digit random number
    let code = ""
    for(let i= 0;i<6;i++){
        code += parseInt(Math.random()*10)
    }
    return code 
}

//Establish a connection to send a verification code
exports.send= function (EMAIL){
  let code=randomFns()
  transport.sendMail({
    from: 'donuts_team@aliyun.com', // Sending mailbox
    to: EMAIL, // Recipient list
    subject: 'Verify your email', // Title
    html: `
    <p>Hi!</p>
    <p>You are registering an account!</p>
    <p>Your verification code is：<strong style="color: #ff4e2a;">${code}</strong></p>
    <p>***The verification code is valid within 5 minutes***</p>` // html content
  }, 
  function(error, data) {
    //assert(!error,500,"Send verification code error！")
    transport.close();
  }
    return code
  )}
//.... 
//Save the email address and verification code in the Code, while ensuring the uniqueness of this record. And delete this record within 5 minutes
/*const Code = require("../models/Code")
const e_mail = EMAIL
await Code.deleteMany({e_mail}) //Delete the old verification code
const [data] = await Code.insertMany({e_mail,veri_code:code}) //Insert new email verification code
setTimeout(async ()=>{    //Delete after 5 minutes
    await Code.deleteMany({e_mail})
},1000*60*5)
}else{
    assert(false,422,'Please enter the correct email format!')
}*/
