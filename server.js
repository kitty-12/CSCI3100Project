// Connect to mongodb
const mongoose = require('mongoose');
const url = "mongodb://admin:123123@localhost:27017/";
mongoose.connect(url, { useUnifiedTopology: true }, function (err) {
    if (err) {
        console.log('[CONNECT ERROR] - ', err.message);
        return; }
    console.log("Connection is successful!");
    mongoose.connection.close();
});

// define schema of the database(not all fields are pulled in)
const user = mongoose.model("user",{
    uname:{},
    pwd:{}
    }
)

const post = mongoose.model("post",{
    author:{},
    img:{},
    text:{}
    }
)

const tag = mongoose.model("tag",{
    name:String
})

// define basic functions
// insert

const insertObj = new post({
    author: "Allen5",
    text: "123123"
    }
)
insertObj.save()
    .then(res=>{
        console.log(res)
        return
    })
    .catch(err=>{
        console.log("insert failed"+err)
        return false
    })

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

user.updateOne({uname:"Allen2"} ,{uname:"Allen3"})
    .then(res=>{
        console.log(res)
        return
    })
    .catch(err=>{
        console.log("find failed"+err)
        return false
    }
)


// delete
user.deleteOne({uname:"Allen2"} )
    .then(res=>{
        console.log(res)
        return
    })
    .catch(err=>{
            console.log("find failed"+err)
            return false
        }
    )



