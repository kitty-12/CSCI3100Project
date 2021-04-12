<template>
  <div id ="Navigator">
    <nav class="Top">
      <div>
        <!--Website icon-->
        <div class = "icon">Platform icon placeholder</div>
        <!--Search box-->
        <div class = "SearchBox">
          <label>
            <input v-model="keyword" class = "InputBox" placeholder="Search your favorite works">
          </label>
          <button v-on:click="search" class = "SearchButton">Search!</button>
        </div>
        <div>
          <div>
            <a :href="pagelink"><img :src="imglink" class = "avatar"></a>
          </div>
        </div>
      </div>
    </nav>
    <div class="Top-3">
      <div class="Top-2">
        <el-button @click="drawer=true" class="message" type="warning" plain icon="custom-icon el-icon-message"></el-button>
        <el-drawer
            title="Messages"
            :visible.sync="drawer"
            :direction="direction"
            size='20%'>
                <span>
                    <ul>
                    <li v-for="message in messageList" :key="message.news">
                    {{message.news}}
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
  props:{userid:''},
  data:function(){
    return {
      keyword: '',
      url: "",
      imglink: "https://www.otomate.jp/lp/special/img/twitter/icon_yukito.png",//for test
      pagelink: "https://www.otomate.jp/lp/",//for test
      drawer:false,
      direction: 'rtl',
      messageList:[
        {news:'Harumi liked your post!'},
        {news:'Chiyuki collected your post!'}
        ]
    }
  },
  methods: {
    search: function () {
      console.log(this.keyword)//check whether got input
      this.$http.post(
          "/api/admin/editProfile",
          {UserInfo:obj},
          {emulateJSON:true}).then(
          function (res){
            console.log(res);
            this.msg = res.body;
          },
          function (res){
            console.log(res.status);
          }
      );
    },
    gotoUserPage:function (){

    },
    goCreate:function (){

    }
  },
  created() {
    let obj={
      _id:this.userid
    }
    this.$http.get(
        "/api/admin/returnPersonalInfo",
        {params:{info:obj}},
        {emulateJSON:true}).then(
        function(res){
          console.log(res);
          this.imglink=res.body.image;
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
  width: 84%;
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
  margin-top: 1%;
}
.avatar:hover{

}
.Top-3{
  height:240px;

  background:#58a;
  background-image: repeating-linear-gradient(60deg,rgba(255,255,255,.1),rgba(255,255,255,.1) 15px, transparent 0,transparent 30px);
}
.Top-2 {
  height: 80px;

}
.newWork{
  width:30%;
  height:80px;
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
  height: 80px;
  width: 10%;
}
.custom-icon {
  font-size: 2rem;
}
</style>