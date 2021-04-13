<template>
  <div id="SearchResult">
  <Navigator></Navigator>
    <div v-if="type=='1'||type=='2'">
      <el-radio-group v-model="radio" @change="changeDefault">
        <el-radio style="font-size: 20px" label="1">By Heat</el-radio>
        <el-radio style="font-size: 20px" label="2">By Time</el-radio>
      </el-radio-group>
    </div>
    <div style="float: left;margin-right: 5%;margin-left: 5%">
      <div v-for="value in currentData" :key="value">
        <div class="card">
          <div class="img">
            <img :class="img" :src="value.img">
          </div>
          <div>
            <p style="display: inline;float: left;margin-left:10px; ">value.title</p>
            <el-link style="font-size: 15px;margin-top: 20px; margin-right: 10px;float: right; " type="primary" @click="$router.push({name:'article',params:{uid:uid,article_id:value.aid}})">See detail</el-link>
          </div>
        </div>
      </div>
    </div>
    <footer>
      <button @click="prevPage()">
        Previous Page
      </button>
      <span>Page{{currentPage}}/Total{{totalPage}}Pages</span>
      <button @click="nextPage()">
        Next Page
      </button>
    </footer>

  </div>
</template>

<script>
import Navigator from "@/components/Navigator";
export default {
name: "SearchResult",

  components:{
    Navigator
  },
  data:function (){
    return {
      uid:'6075a17f501e7649d4313288',
      type:0,
      i:0,
      radio:0,
      postList:[],
      totalPage:1,
      currentPage:1,
      pageSize:15,
      currentData:[]
    }
  },
  mounted() {
    this.type=this.$route.params.type;
    this.keyword=this.$route.params.keyword;
    this.uid=this.$route.params.uid;
    if(this.type=='1' ||this.type=='2'){
      this.radio=this.type;
      this.$http.post(
          "http://localhost:3000/search_result/admin/search",
          {params: {_id: this.userid,criterion:this.type}},
          {emulateJSON: true}).then(
          function (res) {
            console.log(res);
            for (let i = 0; i < res.result.length; i++) {
              this.data().postList.push({aid:res.result[i]._id,title:res.result[i].title,img:'http://localhost:8081'+res.result[i].img[0]})
            }
          },
          function (res) {
            console.log(res.status);
          }
      )
    }
    else if(this.type=='3')
    {
      this.$http.post(
          "http://localhost:3000/user_page/admin/returnPersonalArtical",
          {info:this.userid},
          {emulateJSON:true}).then(
          function (res){
            console.log(res);
            for (let i=0;i<res._id.length;i++){
              this.data().postList.push({pid:res._id[i],title:res.title,img:'http://localhost:8081'+res.img[0]});
            }
          },
          function (res){
            console.log(res.status);
          }
      );
    }
    else if(this.type=='4') {
      this.$http.post(
          "http://localhost:3000/user_page/admin/returnCollectedArtical",
          {info: this.userid},
          {emulateJSON: true}).then(
          function (res) {
            console.log(res);
            for (let i = 0; i < res._id.length; i++) {
              this.data().postList.push({pid: res._id[i], title: res.title, img: 'http://localhost:8081' + res.img[0]});
            }
          },
          function (res) {
            console.log(res.status);
          }
      )
    }
      else if(this.type=='5'){
      this.$http.post(
          "http://localhost:3000/main_page/admin/mainPage",
          {_id: this.uid},
          {emulateJSON: true}).then(
          function (res) {
            for (let i = 0; i < res.result.length; i++) {
              this.data().postList.push({aid:res.result[i]._id,title:res.result[i].title,img:'http://localhost:8081'+res.result[i].img[0]})
            }
            console.log(res);
          },
          function (res) {
            console.log(res.status);
          }
      )
    }
      else if(this.type=='6'){
      this.$http.post(
          "http://localhost:3000/main_page/admin/mainPage",
          {_id: this.uid},
          {emulateJSON: true}).then(
          function (res) {
            for (let i = 0; i < res.result.length; i++) {
              this.data().postList.push({aid:res.result[i]._id,title:res.result[i].title,img:'http://localhost:8081'+res.result[i].img[0]})
            }
            console.log(res);
          },
          function (res) {
            console.log(res.status);
          }
      )
    }
      else if (this.type=='7'){
      this.$http.post(
          "http://localhost:3000/main_page/admin/mainPage",
          {_id: this.uid},
          {emulateJSON: true}).then(
          function (res) {
            for (let i = 0; i < res.result.length; i++) {
              this.data().postList.push({aid:res.result[i]._id,title:res.result[i].title,img:'http://localhost:8081'+res.result[i].img[0]})
            }
            console.log(res);
          },
          function (res) {
            console.log(res.status);
          }
      )
    }
    this.totalPage = Math.ceil(this.postList.length / this.pageSize);
    this.totalPage = this.totalPage == 0 ? 1 : this.totalPage;
    this.setCurrentPageData();
  },
  methods:{
    setCurrentPageData:function () {
      let begin = (this.currentPage - 1) * this.pageSize;
      let end = this.currentPage * this.pageSize;
      this.currentData = this.postList.slice(
          begin,
          end
      );
    },
    prevPage:function () {
      console.log(this.currentPage);
      if (this.currentPage == 1)
        return;

      this.currentPage--;
      this.setCurrentPageData();
    },
    // 下一页
    nextPage:function () {
      if (this.currentPage == this.totalPage)
        return ;

      this.currentPage++;
      this.setCurrentPageData();

    },
    changeDefault:function (){
      this.$router.push({name: "result", params: {type: this.radio, keyword: this.keyword,uid:this.uid}});

    }
  }
}
</script>

<style scoped>
.card{
  width:210px;
  height:250px;
  margin-left:10%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  display: inline;
  float: left;
}
.img{
  width:210px;
  height: 200px;
}
</style>