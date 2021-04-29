<template>
  <div id="SearchResult">
    <!--insert the navigator component-->
    <Navigator :uid="uid"></Navigator>
    <!--show that the search result is sorted by heat-->
    <div v-if="type=='1'||type=='2'">
      <el-radio-group v-model="radio" @change="changeDefault">
        <el-radio style="font-size: 20px" label="1">By Heat</el-radio>
        <!--el-radio style="font-size: 20px" label="2">By Time</el-radio-->
      </el-radio-group>
    </div>
    <!-- show the result-->
    <div class='result' style="float: left;margin-right: 5%;margin-left: 5%">
      <!-- use a loop to traverse all the works and show them in cards-->
      <div v-for="value in postList" :key="value">
        <div v-if="value" class="card">
          <div class="img">
            <img v-if="value.img" class="img" :src="value.img">
          </div>
          <div>
            <p style="display: inline;float: left;margin-left:10px; ">{{value.title}}</p>
            <el-link style="font-size: 15px;margin-top: 20px; margin-right: 10px;float: right; " type="primary" @click="$router.push({name:'article',params:{uid:uid,article_id:value.aid}})">See detail</el-link>
          </div>
        </div>
      </div>
    </div>

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
      uid:'',
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
  created() {
    /*
     * the parameters from other pages
     * type is for what this page will show
     * uid is for searching according to this user's tag blacklist and pass to navigator
     */
    this.type=this.$route.params.type;
    this.keyword=this.$route.params.keyword;
    this.uid=this.$route.params.uid;

    //the normal search result when user type keywords in search box and search
    if(this.type=='1' ||this.type=='2'){
      this.radio=this.type;
      this.$http.post(
          "http://localhost:3000/search_result/admin/search",
          {_id: this.uid,criterion:this.type,key:this.keyword},
          {emulateJSON: true}).then(
          function (res) {
            console.log(res);
            for (let i = 0; i < res.body.length; i++) {
              this.postList.push({aid:res.body[i]._id,title:res.body[i].title,img:'http://localhost:8081'+res.body[i].img[0]})
            }
          },
          function (res) {
            console.log(res.status);
          }
      )
    }

    //search user's all works, the previous page is a user page
    else if(this.type=='3')
    {
      this.$http.post(
          "http://localhost:3000/user_page/admin/returnPersonalArtical",
          {_id:this.uid},
          {emulateJSON:true}).then(
          function (res){
            console.log(res);
            for (let i=0;i<res.body.length;i++){
              this.postList.push({pid:res.body[i]._id,title:res.body[i].title,img:'http://localhost:8081'+res.body[i].img[0]});
            }
          },
          function (res){
            console.log(res.status);
          }
      );
    }

    //search user's all collections, the previous page is a user page
    else if(this.type=='4') {
      this.$http.post(
          "http://localhost:3000/user_page/admin/returnCollectedArtical",
          {_id: this.uid},
          {emulateJSON: true}).then(
          function (res) {
            console.log(res);
            for (let i = 0; i < res.body.length; i++) {
              this.postList.push({pid: res.body[i]._id, title: res.body[i].title, img: 'http://localhost:8081' + res.body[i].img[0]});
            }
          },
          function (res) {
            console.log(res.status);
          }
      )
    }

      /*
       * search all works and sorted by heat
       * will use this function when come to this page by clicking the more link in main page hottest works
       */
      else if(this.type=='5'){
      this.$http.post(
          "http://localhost:3000/main_page/admin/mainPage",
          {_id: this.uid},
          {emulateJSON: true}).then(
          function (res) {
            for (let i = 0; i < res.body.length; i++) {
              this.postList.push({aid:res.body[i]._id,title:res.body[i].title,img:'http://localhost:8081'+res.body[i].img[0]})
            }
            console.log(res);
          },
          function (res) {
            console.log(res.status);
          }
      )
    }
      /*
       * search all works and sorted by time
       * will use this when come to this page by clicking the more link in main page under latest works
       */
      else if(this.type=='6'){
      this.$http.post(
          "http://localhost:3000/main_page/admin/mainPage_latest",
          {_id: this.uid},
          {emulateJSON: true}).then(
          function (res) {
            for (let i = 0; i < res.body.length; i++) {
              this.postList.push({aid:res.body[i]._id,title:res.body[i].title,img:'http://localhost:8081'+res.body[i].img[0]})
            }
            console.log(res);
          },
          function (res) {
            console.log(res.status);
          }
      )
    }
      /*else if (this.type=='7'){
      this.$http.post(
          "http://localhost:3000/main_page/admin/mainPage",
          {_id: this.uid},
          {emulateJSON: true}).then(
          function (res) {
            for (let i = 0; i < res.body.length; i++) {
              this.data().postList.push({aid:res.body[i]._id,title:res.body[i].title,img:'http://localhost:8081'+res.body[i].img[0]})
            }
            console.log(res);
          },
          function (res) {
            console.log(res.status);
          }
      )
    }*/
    /*
    this.totalPage = Math.ceil(this.postList.length / this.pageSize);
    this.totalPage = this.totalPage == 0 ? 1 : this.totalPage;
    this.setCurrentPageData();*/
  },
  methods:{
    /*setCurrentPageData:function () {
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

    nextPage:function () {
      if (this.currentPage == this.totalPage)
        return ;

      this.currentPage++;
      this.setCurrentPageData();

    },
    changeDefault:function (){
      this.$router.push({name: "result", params: {type: this.radio, keyword: this.keyword,uid:this.uid}});

    }*/
  }
}
</script>

<style scoped>
.card{
  width:210px;
  height:250px;
  margin-left:120px;
  margin-top: 80px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  float: left;
}
.img{
  width:210px;
  height: 200px;
}

.result{
  display: flex;
  text-align: center;
  align-items: center;
  flex-wrap: wrap;
}
</style>