<template>
  <div id ="Navigator">
    <nav class="Top">
      <div>
        <!--Website icon-->
        <el-tooltip class="item" effect="dark" content="Go to Main Page" placement="bottom-start">
          <router-link to="/main" class = "icon"></router-link>
        </el-tooltip>
        <!--Search box-->
        <div class = "SearchBox">
          <label>
            <input v-model="keyword" class = "InputBox" placeholder="Search your favorite works">
          </label>
          <button v-on:click="search" class = "SearchButton">Search!</button>
        </div>
        <div>
          <div>
              <router-link @click="gotoUser"><img :src="imglink" class = "avatar"></router-link>
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
                    <li v-for="message in messageList" :key="message.text">
                      {{message.sender}}:{{message.text}}<el-button @click="this.$router.push({name:'post',params:{aid:message.article_id,uid:this.userid}})" type="primary" icon="el-icon-right" circle></el-button>
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
      userid:"6075a17f501e7649d4313288",
      keyword: '',
      url: "",
      uname:'',
      imglink: "",
      drawer:false,
      direction: 'rtl',
      messageList:[]
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
    getMessage:function (){
      this.$http.get(
          "http://localhost:3000/test/admin/returnMessage",
          {params:{info:this.uid}},
          {emulateJSON:true}).then(
          function(res){
            console.log(res);
            for(let i=0;i<res.doc[0].message.length;i++){
              this.messageList.push(res.doc[0].message[i])
            }
          },
          function(res){
            console.log(res.status);
          }
      );
    },
    goCreate:function (){
      let aid='';
      let obj;
      obj = {
        author: {
          author_id: this.uid,
          uname: this.uname
        },
        title:'',
        text:'',
        img:[],
        post_time: new Date(),
        read: '',
        like: [],
        collect: 0,
        tag: [],
        comments: []
      };
      this.$http.get(
          "http://localhost:3000/test/admin/createArticle",
          {params:{articleInformation:obj}},
          {emulateJSON:true}).then(
          function(res){
            console.log(res);
            aid=res.article._id;
          },
          function(res){
            console.log(res.status);
          }
      );
      this.$router.push({name:"create",params:{uid:this.uid,article_id:aid}});
    }
  },
  mounted() {
    this.userid=this.uid;
    let obj={
      _id:this.userid
    }
    this.$http.get(
        "http://localhost:3000/test/admin/returnPersonalInfo",
        {params:{info:obj}},
        {emulateJSON:true}).then(
        function(res){
          console.log(res);
          this.imglink='http://localhost:8081'+res.docs.picture;
          this.uname=res.docs.profile.user_name;
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
.avatar:hover{

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
</style>