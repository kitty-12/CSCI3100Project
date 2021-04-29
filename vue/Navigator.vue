<template>
  <div id ="Navigator">
    <nav class="Top">
      <div>
        <!--Website icon-->
        <el-tooltip class="item" effect="dark" content="Go to Main Page" placement="bottom-start">
          <!--click on it will go to main page-->
          <div @click="gotoMain" class = "icon"><img src='../assets/fullLogo.png' width="70%" height="100%"></div>
        </el-tooltip>
        <!--Search box-->
        <div style="float: left;width:40%;margin-top: 30px;margin-left: 5%">
          <el-input placeholder="Search your interests!" v-model="keyword" >
            <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
        <div>
          <!-- user's avatar-->
          <div style="float: left;width: 30%;margin-top: 10px;">
              <!--click on it will go to user's page-->
              <div @click="gotoUser" class="demo-basic--circle">
                <div style="margin-left: 70%">
                  <el-avatar :size="80" :src="imglink" class="avataricon"></el-avatar>
                </div>
              </div>
              </div>
          </div>
        </div>
    </nav>
    <!--lower part of navigator-->
    <div class="Top-3">
      <div class="Top-2">
        <!--message box button, click on it will show message box-->
        <el-button @click="drawer=true" class="message" type="warning" plain>
          <i class="el-icon-message" style="font-size: 2rem"></i>
        </el-button>
        <!--message box-->
        <el-drawer
            title="Messages"
            :visible.sync="drawer"
            :direction="direction"
            @open="getMessage"
            size='20%'>
                <span>
                    <ul>
                    <li v-for="message in messageList" :key="message">
                      {{message}}
                    </li>
                    </ul>
              </span>
        </el-drawer>
      </div>
      <!--create new work button-->
      <div class="Top-2">
        <!--click on it will go to create article page-->
        <button @click ="goCreate" class="newWork">Create New Work!</button>
      </div>
      <div class="Top-2"></div>
    </div>
  </div>
</template>

<script>
export default {
name: "Navigator",
  props:
    ["uid"],
  data:function(){
    return {
      userid:"",
      keyword: '',
      url: "",
      uname:'',
      imglink: "",
      drawer:false,
      direction: 'rtl',
      messageList:[],
      aid:''
    }
  },
  methods: {
    //go to search result page with keyword
    search: function () {
      console.log(this.keyword)//check whether got input
      this.$router.push({name:"result",params:{type:"1",keyword:this.keyword,uid:this.uid}});
    },

    //go to user's page
    gotoUser:function (){
      this.$router.push({name:"user",params:{uid1:this.uid,uid2:this.uid}});
    },

    //go to main page
    gotoMain:function (){
      this.$router.push({name:"main",params:{uid:this.uid}})
    },

    //when open message box, ask the server for unread messages
    getMessage:function (){
      this.$http.post(
          "http://localhost:3000/user_page/admin/returnMessage",
          {_id:this.uid},
          {emulateJSON:true}).then(
          function(res){
            console.log(res);
            for(let i=0;i<res.body.length;i++){
              this.messageList.push(res.body[i])
            }
          },
          function(res){
            console.log(res.status);
          }
      );
    },

    /*
     * go to create article page
     * it will send the author id to the server for a request
     * the server will send back the article id, here the article is already created
     * user will update the details of the article in create article page
     */
    goCreate:function (){
      let obj;
      obj = {
        author: {
          author_id: this.uid,
          uname: this.uname
        },
        title:'',
        text:'',
        img:[],
        post_time: Date,
        read: '',
        like: [],
        collect: 0,
        tag: [],
        comments: []
      };
      this.$http.post(
          "http://localhost:3000/create_article/admin/createArticle",
          {articleInformation:obj},
          {emulateJSON:true}).then(
          function(res){
            console.log(res.body);
            this.aid=res.body;
            console.log("na ",this.aid)
            this.$router.push({name:"create",params:{uid:this.uid,article_id:this.aid}});
          },
          function(res){
            console.log(res.status);
          }
      );
     
    }
  },
  created() {
    //get the userid
    this.userid=this.uid;
    let obj={
      _id:this.userid
    }

    //use the userid to get other information such as the avatar
    this.$http.post(
        "http://localhost:3000/user_page/admin/returnPersonalInfo",
        obj,
        {emulateJSON:true}).then(
        function(res){
          console.log(res);
          if(res.body.profile.picture !==''){
            this.imglink=res.body.profile.picture;
          }
          this.uname=res.body.profile.uname;
        },
        function(res){
          console.log(res.status);
        }
    );

  }
}
</script>

<style scoped>
.Top{
  height:100px;
  background: #485868;
  border-radius: 5px;
}
.icon{
  z-index: 10;
  width: 25%;
  height:100px;
  background: url('D://csci3100/proj code/test/src/assets/fullLogo.png');
  float:left;
  border-radius: 5px;
}
.SearchBox{
  width: 40%;
  height: 35px;
  outline: hidden;
  margin: auto;
  border: 1px solid black;
  position: absolute;
  top:5%;left: 30%;
  background: white;

}
.InputBox{
  width: 90%;
  height: 30px;
  border: none;
  line-height: 15px;
  outline: none;
  padding-left: 10px;
  caret-color: #a1c4fd;
  font-size: 13px;


}
.SearchButton{
  width: 80px;
  height: 35px;
  border: none;
  position: absolute;
  right: 0;
  outline: none;
  background: #D86868;
  font-size: 18px;
}
.SearchButton:hover{
  border: 1px solid #485868;
}

.avatar{
  border-radius: 50%;
  width: 70px;
  height: 70px;
  object-fit: cover;
  object-position: center;
  right: 50px;
  position: absolute;
  border: 1px solid black;
  float: left;
  margin-top: 1%;
}

.Top-3{
  height:180px;

  background:#58a;
  background-image: repeating-linear-gradient(60deg,rgba(255,255,255,.1),rgba(255,255,255,.1) 15px, transparent 0,transparent 30px);
}
.Top-2 {
  height: 60px;

}
.newWork{
  width:25%;
  height:60px;
  background:#D86868;
  border-radius: 20px;
  top:5%;
  margin: 0 auto;
  border: none;
  display: block;
  font-family: Bebas Neue,Lobster, serif;
  font-size: 200%;
}
.message{
  float: right;
  height: 60px;
  width: 10%;
}

.avataricon{
  background-color: #ffffff;
}
</style>