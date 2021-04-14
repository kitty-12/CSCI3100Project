<template>
  <div id="MainPage">
    <Navigator :uid="userid"></Navigator>
    <div>
      <div class="sec">
        <div>
          <h2 class="title">Most Popular Works on Donuts</h2>
          <el-link @click="searchHottest" type="primary" style="font-size: 20px;margin-bottom: 10px">more
            <i class="el-icon-view el-icon--right"></i></el-link>
        </div>
        <div class="gallery">
          <div v-if="mostPopular[0]" class="card">
            <div class="img">
              <img class="img" :src="mostPopular[0].img">
            </div>
            <div>
              <p style="display: inline;float: left;margin-left:10px; ">{{mostPopular[0].title}}</p>
              <el-link style="font-size: 15px;margin-top: 20px; margin-right: 10px;float: right; " type="primary" @click="$router.push({name:'article',params:{uid:userid,article_id:mostPopular[0].aid}})">See detail</el-link>
            </div>
          </div>
          <div  v-if="mostPopular[1]" class="card">
            <div class="img">
              <img class="img" :src="mostPopular[1].img">
            </div>
            <div>
              <p style="display: inline;float: left;margin-left:10px; ">{{mostPopular[1].title}}</p>
              <el-link style="font-size: 15px;margin-top: 20px; margin-right: 10px;float: right; " type="primary" @click="$router.push({name:'article',params:{uid:userid,article_id:mostPopular[1].aid}})">See detail</el-link>
            </div>
          </div>
          <div  v-if="mostPopular[2]" class="card">
            <div class="img">
              <img class="img" :src="mostPopular[2].img">
            </div>
            <div>
              <p style="display:inline;float: left;margin-left:10px; ">{{mostPopular[2].title}}</p>
              <el-link style="font-size: 15px;margin-top: 20px; margin-right: 10px;float: right; " type="primary" @click="$router.push({name:'article',params:{uid:userid,article_id:mostPopular[2].aid}})">See detail</el-link>
          </div>
        </div>
        </div>
      </div>
      <div style="margin-right: 10%;margin-left: 10%"><hr></div>
    </div>
    <div>
      <div class="sec">
        <div>
          <h2 class="title">Latest Works</h2>
          <el-link @click="searchNewest" type="primary" style="font-size: 20px;margin-bottom: 10px">more
            <i class="el-icon-view el-icon--right"></i></el-link>
        </div>
        <div class="gallery">
        <div  v-if="mostRecent[0]" class="card">
          <div class="img">
            <img class="img" :src="mostRecent[0].img">
          </div>
          <div>
            <p style="display: inline;float: left;margin-left:10px; ">{{mostRecent[0].title}}</p>
            <el-link style="font-size: 15px;margin-top: 20px; margin-right: 10px;float: right; " type="primary" @click="$router.push({name:'article',params:{uid:userid,article_id:mostRecent[0].aid}})">See detail</el-link>
          </div>
        </div>
        <div v-if="mostRecent[1]" class="card">
          <div class="img">
            <img class="img" :src="mostRecent[1].img">
          </div>
          <div>
            <p style="display: inline;float: left;margin-left:10px; ">{{mostRecent[1].title}}</p>
            <el-link style="font-size: 15px;margin-top: 20px; margin-right: 10px;float: right; " type="primary" @click="$router.push({name:'article',params:{uid:userid,article_id:mostRecent[1].aid}})">See detail</el-link>
          </div>
        </div>
        <div v-if="mostRecent[2]" class="card">
          <div class="img">
            <img class="img" :src="mostRecent[2].img">
          </div>
          <div>
            <p style="display: inline;float: left;margin-left:10px; ">{{mostRecent[2].title}}</p>
            <el-link style="font-size: 15px;margin-top: 20px; margin-right: 10px;float: right; " type="primary" @click="$router.push({name:'article',params:{uid:userid,article_id:mostRecent[2].aid}})">See detail</el-link>
          </div>
        </div>
      </div>
      </div>
      <div style="margin-right: 10%;margin-left: 10%"><hr></div>
    </div>
    <div>
      <div class="sec">
        <div>
          <h2 class="title">Most Popular Works This Week</h2>
          <el-link @click="searchToday" type="primary" style="font-size: 20px;margin-bottom: 10px">more
            <i class="el-icon-view el-icon--right"></i></el-link>
        </div>
        <div class="gallery">
          <div v-if="mostPopularWeekly[0]" class="card">
            <div class="img">
              <img class="img" :src="mostPopularWeekly[0].img">
            </div>
            <div>
              <p style="display: inline;float: left;margin-left:10px; ">{{mostPopularWeekly[0].title}}</p>
              <el-link style="font-size: 15px;margin-top: 20px; margin-right: 10px;float: right; " type="primary" @click="$router.push({name:'article',params:{uid:userid,article_id:mostPopularWeekly[0].aid}})">See detail</el-link>
            </div>
          </div>
          <div v-if="mostPopularWeekly[1]" class="card">
            <div class="img">
              <img class="img" :src="mostPopularWeekly[1].img">
            </div>
            <div>
              <p style="display: inline;float: left;margin-left:10px; ">{{mostPopularWeekly[1].title}}</p>
              <el-link style="font-size: 15px;margin-top: 20px; margin-right: 10px;float: right; " type="primary" @click="$router.push({name:'article',params:{uid:userid,article_id:mostPopularWeekly[1].aid}})">See detail</el-link>
            </div>
          </div>
          <div v-if="mostPopularWeekly[2]" class="card">
            <div class="img">
              <img class="img" :src="mostPopularWeekly[2].img">
            </div>
            <div>
              <p style="display: inline;float: left;margin-left:10px; ">{{mostPopularWeekly[2].title}}</p>
              <el-link style="font-size: 15px;margin-top: 20px; margin-right: 10px;float: right; " type="primary" @click="$router.push({name:'article',params:{uid:userid,article_id:mostPopularWeekly[1].aid}})">See detail</el-link>
            </div>
        </div>
        </div>

      </div>
      <div style="margin-right: 10%;margin-left: 10%"><hr></div>
    </div>
  </div>
</template>

<script>
import Navigator from "./Navigator";
export default {
  name: "MainPage",
  components:{
    Navigator
  },

  data (){
    return {
      mostPopular:[],
      mostRecent:[],
      mostPopularWeekly:[],
      userid:''
    }
  },
  created: function () {
    this.userid=this.$route.params.uid;

    //this.userid='6075fe1570e05207fc5570d3'
    
    this.$http.post(
        "http://localhost:3000/main_page/admin/mainPage",
        {_id: this.userid},
        {emulateJSON: true}).then(
        function (res) {
          console.log("here");
          //console.log(res);
          console.log("first ",this.mostPopular)
          for (let i = 0; i < res.body.length; i++) {
            this.mostPopular.push({aid:res.body[i]._id,title:res.body[i].title,img:'http://localhost:8081'+res.body[i].img[0]})
          }
          console.log("2nd ",this.mostPopular)
          //push placeholder
          for (let j = 0; j < 3; j++) {
            this.mostPopular.push({aid:"undefined",title:"Placeholder",img:'https://i.stack.imgur.com/y9DpT.jpg'})
          }

          console.log(res);
        },
        function (res) {
          console.log(res.status);
        }
    )
    this.$http.post(
        "http://localhost:3000/main_page/admin/mainPage_latest",
        {_id: this.userid},
        {emulateJSON: true}).then(
        function (res) {
          console.log(res);
          //this.mostRecent = res.body

          for (let i = 0; i < res.body.length; i++) {
            this.mostRecent.push({aid:res.body[i]._id,title:res.body[i].title,img:'http://localhost:8081'+res.body[i].img[0]})
          }

          //push placeholder
          for (let j = 0; j < 3; j++) {
            this.mostRecent.push({aid:"undefined",title:"Placeholder",img:'https://i.stack.imgur.com/y9DpT.jpg'})
          }

        },
        function (res) {
          console.log(res.status);
        }
    )
    this.$http.post(
        "http://localhost:3000/main_page/admin/mainPage_hotThiWeek",
        {_id: this.userid},
        {emulateJSON: true}).then(
        function (res) {
          console.log(res);

          this.mostPopularWeekly = res.body

          for (let i = 0; i < res.body.length; i++) {
            this.mostPopularWeekly.push({aid:res.body[i]._id,title:res.body[i].title,img:'http://localhost:8081'+res.body[i].img[0]})
          }

          //push placeholder
          for (let j = 0; j < 3; j++) {
            this.mostPopularWeekly.push({aid:"undefined",title:"Placeholder",img:'https://i.stack.imgur.com/y9DpT.jpg'})
          }
        },
        function (res) {
          console.log(res.status);
        }
    )
  },
  methods:{
    searchHottest:function (){
      this.$router.push({name: "result", params: {type: '5', keyword: '',uid:this.userid}})
    },
    searchNewest:function (){
      this.$router.push({name: "result", params: {type: '6', keyword: '',uid:this.userid}})
    },
    searchToday:function (){
      this.$router.push({name: "result", params: {type: '7', keyword: '',uid:this.userid}})
    }
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
.title{
  font-family: 'Roboto', sans-serif;
  display: block;
}
.sec{
  width:100%;
  display: block;
  float: left;
}
.gallery{
  display: block;
  width:85%;
  float: left;
  margin-left: 100px;
  margin-bottom: 50px;
}
.card{
  width:300px;
  height:350px;
  margin-left:10%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  display: inline;
  float: left;
}
.img{
  width:300px;
  height: 300px;
}
</style>