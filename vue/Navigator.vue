<template>
  <div id ="Navigator">
    <nav class="Top">
      <div>
        <!--Website icon-->
        <el-tooltip class="item" effect="dark" content="Go to Main Page" placement="bottom-start">
          <div @click="gotoMain" class = "icon"></div>
        </el-tooltip>
        <!--Search box-->
        <div style="float: left;width:40%;margin-top: 30px;margin-left: 5%">
          <el-input placeholder="Search your interests!" v-model="keyword" >
            <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
        <div>
          <div style="float: left;width: 30%;margin-top: 10px;">
              <div @click="gotoUser" class="demo-basic--circle">
                <div style="margin-left: 70%">
                  <el-avatar :size="80" :src="imglink" class="avataricon"></el-avatar>
                </div>
              </div>
              </div>
          </div>
        </div>
    </nav>
    <div class="Top-3">
      <div class="Top-2">
        <el-button @click="drawer=true" class="message" type="warning" plain>
          <i class="el-icon-message" style="font-size: 2rem"></i>
        </el-button>
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
      <div class="Top-2">
        <button @click ="goCreate" class="newWork">Creat New Work!</button>
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
    search: function () {
      console.log(this.keyword)//check whether got input
      this.$router.push({name:"result",params:{type:"1",keyword:this.keyword,uid:this.uid}});
    },
    gotoUser:function (){
      this.$router.push({name:"user",params:{uid1:this.uid,uid2:this.uid}});
    },
    gotoMain:function (){
      this.$router.push({name:"main",params:{uid:this.uid}})
    },
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
    this.userid=this.uid;
    let obj={
      _id:this.userid
    }
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
  width: 25%;
  height:100px;
  background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
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