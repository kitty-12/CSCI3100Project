// This is some naive design for database related coding
// Connect to mongodb
const mongoose = require('mongoose');
const url = "mongodb+srv://yaohaishu:YHS123456@cluster0.4ccqg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(url, { useUnifiedTopology: true }, function (err) {
    if (err) {
        console.log('[CONNECT ERROR] - ', err.message);
        return; }
    console.log("Connection is successful!");
    mongoose.connection.close();
});

// define schema of the database
const user = mongoose.model("user",{
    uname:String,
    pwd:String,
    email:String,
    Profile:{
        user_name:String,
        Gender:String,
        Birth:String,
        Introduction:String,
        picture:{}
    },
    Liked:[],
    Collected:[],
    Post:[],
    Message:{
        sender:String,
        Type:Number,   //(like,collect,comment,chat,announce,complain)
        Text:String
    },
    Black_list:[],
    is_admin:Boolean,
    is_active:Boolean,
    is_banned:Boolean
    }
)

const post = mongoose.model("post", {
    Author: {
        _id: String,
        uname: String
    },
    Img: {},
    Text: String,
    Post_time: Date,
    Read: Number,
    Like: Number,
    Collect: Number,
    Tag: [],
    Status: Number,
    Comments: {
        aid: String,  // there may include all info that need to be displayed
        Time: Date,
        Text: String
    }
})

const tag = mongoose.model("tag",{
    name:String
})

// define basic functions
// insert
my_insert = function (collection,doc) {
    const insertObj = new collection(doc)
    insertObj.save()
        .then(res=>{
            console.log(res)
            return
        })
        .catch(err=>{
            console.log("insert failed"+err)
            return false
        })
}


// find
my_find=function (collection,type,filter) {  // e.g. filter = {uname:"Allen2"}, filter = {uname:/Allen/}
    if(type==2) {

        collection.find(filter)
            .then(res => {
                console.log(res)
                return res
            })
            .catch(err => {
                console.log("find failed" + err)
                return false
            })
    }
    if(type==1) {
        collection.findOne(filter)
            .then(res => {
                console.log(res)
                return res
            })
            .catch(err => {
                console.log("find failed" + err)
                return false
            })
    }
}

// update
my_update=function (collection,filter,update) {
    collection.updateOne(filter,update)
        .then(res => {
            console.log(res)
            return
        })
        .catch(err => {
                console.log("update failed" + err)
                return false
            }
        )
}


// delete
my_delete=function (collection,filter) {
    collection.deleteOne(filter)
        .then(res => {
            console.log(res)
            return
        })
        .catch(err => {
                console.log("delete failed" + err)
                return false
            }
        )
}


