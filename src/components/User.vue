<template>
  <div id="User">
    <Navigator :uid="userid"></Navigator>
    <div>
      <a :href="bannerLink"><img :src="bannerLink" class="banner"></a>
      <div class="box">
        <div style="float: left;margin-left: 10%">
          <img :src="avatarLink" class="avatarR">
        </div>
        <div style="float:left;">
          <p style="margin-left: 50px;margin-top:50px;padding:30px;display: inline;font-size: 25px;font-weight: bold">{{username}}</p>
          <div v-if="isMyPage" style="display: inline;">
            <el-button @click="edit_on" style="display: inline" type="primary" icon="el-icon-edit" circle></el-button>
            <el-button v-if="isEditting" @click="save_change" style="display: inline" type="success" icon="el-icon-check" circle></el-button>
            <el-button v-if="isEditting" type="danger" @click="cancel_change" style="display:inline" icon="el-icon-close" circle></el-button>
          </div>
        </div>
        <br>
        <div><p style="float: left;margin-top: 50px">{{profile}}</p></div>
        <div v-if="isEditting" style="float: left;margin-left: 10%;margin-top: 50px;width:100%">
          <p style="float:left;">Please edit your profile:</p>
          <el-input
              type="text"
              placeholder="Pleaser enter your new name"
              v-model="input_name"
              maxlength="25"
              show-word-limit
          >
          </el-input>
          <div style="margin: 20px 0;"></div>
          <el-input
              type="textarea"
              placeholder="Please enter your new introduction"
              v-model="input_profile"
              maxlength="200"
              show-word-limit
          >
          </el-input>
          <div style="margin: 20px 0;"></div>
          <p>Upload Your New Avatar</p>
          <el-upload
              class="img"
              ref="upload"
              :show-file-list="true"
              :limit="1"
              :action= actionUp
              :http-request="fileRequest"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              :auto-upload = false
              list-type="picture">
            <el-button slot="trigger" size="small" type="primary" style="">Choose img</el-button>
            <div slot="tip" class="el-upload_tip"></div>
          </el-upload>
          <el-button size="small" type="success" @click="submitUpload">Create</el-button>
          <p>Upload Your New Banner</p>
          <el-upload
              class="img"
              ref="upload"
              :show-file-list="true"
              :limit="1"
              :action= actionUp
              :http-request="fileRequest"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              :auto-upload = false
              list-type="picture">
            <el-button slot="trigger" size="small" type="primary" style="float: left;margin: 0 auto;">Choose img</el-button>
            <div slot="tip" class="el-upload_tip"></div>
          </el-upload>
          <el-button size="small" type="success" @click="submitUpload">Create</el-button>
          <div style="margin: 20px 0;"></div>
        </div>
      </div>
    </div>
    <div>

      <div class="sec">
        <div>
          <h2 v-if="isMyPage" class="title">My Works</h2>
          <h2 v-else class="title">{{username}}'s Works</h2>
          <el-link @click="searchWorks" type="primary" style="font-size: 20px;margin-bottom: 10px">All
            <i class="el-icon-view el-icon--right"></i></el-link>
        </div>
        <div class="gallery">
          <div class="card">
            <div class="img">
              <img class="img" :src="works[0].img">
            </div>
            <div>
              <p style="display: inline;float: left;margin-left:10px; ">{{works[0].title}}</p>
              <el-link style="font-size: 15px;margin-top: 20px; margin-right: 10px;float: right; " type="primary" @click="$router.push({name:'article',params:{uid:userid,article_id:works[0].aid}})">See detail</el-link>
            </div>
          </div>
          <div class="card">
            <div class="img">
              <img class="img" :src="works[1].img">
            </div>
            <div>
              <p style="display: inline;float: left;margin-left:10px; ">{{works[1].title}}</p>
              <el-link style="font-size: 15px;margin-top: 20px; margin-right: 10px;float: right; " type="primary" @click="$router.push({name:'article',params:{uid:userid,article_id:works[1].aid}})">See detail</el-link>
            </div>
          </div>
          <div class="card">
            <div class="img">
              <img class="img" :src="works[2].img">
            </div>
            <div>
              <p style="display:inline;float: left;margin-left:10px; ">{{works[2].title}}</p>
              <el-link style="font-size: 15px;margin-top: 20px; margin-right: 10px;float: right; " type="primary" @click="$router.push({name:'article',params:{uid:userid,article_id:works[2].aid}})">See detail</el-link>
            </div>
          </div>
          <div class="card">
            <div class="img">
              <img class="img" :src="works[3].img">
            </div>
            <div>
              <p style="display: inline;float: left;margin-left:10px; ">{{works[3].title}}</p>
              <el-link style="font-size: 15px;margin-top: 20px; margin-right: 10px;float: right; " type="primary" @click="$router.push({name:'article',params:{uid:userid,article_id:works[3].aid}})">See detail</el-link>
            </div>
          </div>
        </div>
        <div style="margin-right: 10%;margin-left: 10%;float: left"><hr></div>
      </div>
      <div v-if="isMyPage" class="sec">
        <div>
            <h2 class="title">My Collections</h2>
            <el-link @click="searchCollections" type="primary" style="font-size: 20px;margin-bottom: 10px">All
              <i class="el-icon-view el-icon--right"></i></el-link>
        </div>
        <div class="gallery">
          <div class="card">
            <div class="img">
              <img class="img" :src="collections[0].img">
            </div>
            <div>
              <p style="display: inline;float: left;margin-left:10px;">{{collections[0].title}}</p>
              <el-link style="font-size: 15px;margin-top: 20px; margin-right: 10px;float: right; " type="primary" @click="$router.push({name:'article',params:{uid:userid,article_id:collections[0].aid}})">See detail</el-link>
            </div>
          </div>
          <div class="card">
            <div class="img">
              <img class="img" :src="collections[1].img">
            </div>
            <div>
              <p style="display: inline;float: left;margin-left:10px; ">{{ collections[1].title }}</p>
              <el-link style="font-size: 15px;margin-top: 20px; margin-right: 10px;float: right; " type="primary" @click="$router.push({name:'article',params:{uid:userid,article_id:collections[1].aid}})">See detail</el-link>
            </div>
          </div>
          <div class="card">
            <div class="img">
              <img class="img" :src="collections[2].img">
            </div>
            <div>
              <p style="display:inline;float: left;margin-left:10px; ">{{collections[2].title}}</p>
              <el-link style="font-size: 15px;margin-top: 20px; margin-right: 10px;float: right; " type="primary" @click="$router.push({name:'article',params:{uid:userid,article_id:collections[2].aid}})">See detail</el-link>
            </div>
          </div>
          <div class="card">
            <div class="img">
              <img class="img" :src="collections[3].img">
            </div>
            <div>
              <p style="display: inline;float: left;margin-left:10px; ">{{ collections[3].title }}</p>
              <el-link style="font-size: 15px;margin-top: 20px; margin-right: 10px;float: right; " type="primary" @click="$router.push({name:'article',params:{uid:userid,article_id:collections[3].aid}})">See detail</el-link>
            </div>
          </div>
        </div>
        <div style="margin-right: 10%;margin-left: 10%;float: left"><hr></div>
      </div>

    </div>
  </div>
</template>

<script>
import Navigator from "./Navigator";
export default {
name: "User",
  components:{
    Navigator
  },
  data:function(){
  return {
      userid:'',
      aid:'',
      username: "noname",
      profile: "Here is the introduction",
      avatarLink: "",
      bannerLink: "",
      isMyPage: true,
      isEditting: false,
      works:[],
      collections:[],
      input_name: '',
      input_profile: '',
      input_avatar: '',
      input_banner: '',
      input_gender: '',
      actionUp:'/api/upload',
      fileList:[],
      imgList:[]

  }
  },
  mounted() {
    this.userid=this.$route.params.uid1;
    this.aid=this.$route.params.uid2;
    if (this.userid==this.aid){
      this.isMyPage=true;
    }

    this.$http.post(
        "http://localhost:3000/user_page/admin/returnPersonalInfo",
        {_id:this.userid},
        {emulateJSON:true}).then(
            function(res){
              console.log(res);
              this.username=res.docs.profile.user_name;
              this.profile=res.docs.profile.introduction;
              this.avatarLink=res.docs.profile.picture;
              this.bannerLink=res.docs.profile.banner;
              //this.works=res.docs.

            },
        function(res){
              console.log(res.status);
        }
    );
    this.$http.post(
        "http://localhost:3000/user_page/admin/returnPersonalArtical",
        {_id:this.userid},
        {emulateJSON:true}).then(
        function (res){
          console.log(res);
          for (let i=0;i<res._id.length;i++){
            this.works.push({pid:res._id[i],title:res.title,img:'http://localhost:8081'+res.img[0]});
          }
        },
        function (res){
          console.log(res.status);
        }
    );
    this.$http.post(
        "http://localhost:3000/user_page/admin/returnCollectedArtical",
        {_id:this.userid},
        {emulateJSON:true}).then(
        function (res){
          console.log(res);
          for (let i=0;i<res._id.length;i++){
            this.collection.push({pid:res._id[i],title:res.title,img:'http://localhost:8081'+res.img[0]});
          }
        },
        function (res){
          console.log(res.status);
        }
    );
  },
  methods:{
      edit_on: function(){
        this.isEditting=true
        console.log("Open edit profile")
      },
      save_change:function (){
        let obj = {
          user_name:this.input_name,
          introduction:this.input_profile,
          picture:this.imgList[0],
          banner:this.imgList[1]
        }
        this.$http.post(
            "http://localhost:3000/user_page/admin/editProfile",
            obj,
            {emulateJSON:true}).then(
                function (res){
                  console.log(res);
                  this.msg = res.body;
                },
                function (res){
                  console.log(res.status);
                }
        );
        location.reload()
      },
      cancel_change:function (){
        location.reload()
      },
      fileRequest(item) {
        let uploadData = new FormData()
        uploadData.append('file',item.file)
        this.$axios.post('/upload',uploadData)
          .then(res =>{
            console.log(res);
            console.log(res);
            this.imgList.push(res.data.path)
          })
      },
      submitUpload() {
      this.$refs.upload.submit();
      },
    handleRemove(file,fileList){
      console.log(file,fileList);
    },
    handlePreview(file){
      console.log(file);
    },
    searchWorks:function (){
        this.$router.push({name:"result",params:{type:'3',uid:this.aid,keyword:"works"}})
    },
    searchCollections:function (){
        this.$router.push({name:"result",params:{type:'4',uid:this.aid,keyword:"collections"}})
    }
  }
}
</script>

<style scoped>
.box{
  display: block;
  width: 85%;
}
.avatarR{
  width: 100px;
  height:100px;
  border: 1px solid silver;
  margin-left: 50px;
  display: inline;
  float: left;
  margin-right: 0;
}
.banner{
  height: 300px;
  width:100%;
  display: block;
  z-index: -1;
  margin-bottom: 30px;
}
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
  margin-left: 5%;
  margin-bottom: 50px;
}
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