<template>
  <div id="User">
    <!-- insert the navigator component-->
    <Navigator :uid="aid"></Navigator>
    <div>
      <!-- user's banner-->
      <a :href="bannerLink"><img :src="bannerLink" class="banner"></a>
      <!--show user's avatar, name and edit profile button-->
      <div class="box">
        <div style="float: left;margin-left: 10%">
          <img :src="avatarLink" class="avatarR">
        </div>
        <div style="float:left;">
          <p style="margin-left: 50px;margin-top:50px;padding:30px;display: inline;font-size: 25px;font-weight: bold">{{username}}</p>
          <!-- if is the current user's page the button will be shown-->
          <div v-if="isMyPage" style="display: inline;">
            <el-button @click="edit_on" style="display: inline" type="primary" icon="el-icon-edit" circle></el-button>
            <!--following two button will only be shown when the user is editing the profile-->
            <el-button v-if="isEditting" @click="save_change" style="display: inline" type="success" icon="el-icon-check" circle></el-button>
            <el-button v-if="isEditting" type="danger" @click="cancel_change" style="display:inline" icon="el-icon-close" circle></el-button>
          </div>
        </div>
        <br>
        <!--show user's introduction-->
        <div><p style="float: left;margin-top: 50px">{{profile}}</p></div>
        <!--show when user click on the edit profile button-->
        <div v-if="isEditting" style="float: left;margin-left: 10%;margin-top: 50px;width:100%">
          <p style="float:left;">Please edit your profile:</p>
          <!-- input box for change name, the length is limited to 25 words-->
          <el-input
              type="text"
              placeholder="Please enter your new name"
              v-model="input_name"
              maxlength="25"
              show-word-limit
          >
          </el-input>
          <!--blank space-->
          <div style="margin: 20px 0;"></div>
          <!--input box for introduction, the length is limited to 200 words-->
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
            <!--input box for avatar's link-->
            <el-input
              type="text"
              placeholder="Please enter your new avatar address"
              v-model="input_avatar">
            </el-input>

          <p>Choose Your New Banner</p>
            <!-- input box for banner's link-->
            <el-input
              type="text"
              placeholder="Please enter your new banner address"
              v-model="input_banner">
            </el-input>
          
          <div style="margin: 20px 0;"></div>
        </div>
      </div>
    </div>
    <!--sections for the two gallery-->
    <div>
      <!--show user's own works-->
      <div class="sec">
        <div>
          <!-- words here will change according to whether it is the current user's page-->
          <h2 v-if="isMyPage" class="title">My Works</h2>
          <h2 v-else class="title">{{username}}'s Works</h2>
          <!-- link to detailed result page-->
          <el-link @click="searchWorks" type="primary" style="font-size: 20px;margin-bottom: 10px">All
            <i class="el-icon-view el-icon--right"></i></el-link>
        </div>
        <!--show the 4 works, it may not be 4 if the user does not have that much-->
        <div class="gallery">
          <!--article card for the first work-->
          <div v-if="works[0]" class="card">
            <div class="img">
              <img class="img" :src="works[0].img">
            </div>
            <div>
              <p style="display: inline;float: left;margin-left:10px; ">{{works[0].title}}</p>
              <el-link style="font-size: 15px;margin-top: 20px; margin-right: 10px;float: right; " type="primary" @click="$router.push({name:'article',params:{uid:userid,article_id:works[0].aid}})">See detail</el-link>
            </div>
          </div>
          <!--card for the second work-->
          <div v-if="works[1]" class="card">
            <div class="img">
              <img class="img" :src="works[1].img">
            </div>
            <div>
              <p style="display: inline;float: left;margin-left:10px; ">{{works[1].title}}</p>
              <el-link style="font-size: 15px;margin-top: 20px; margin-right: 10px;float: right; " type="primary" @click="$router.push({name:'article',params:{uid:userid,article_id:works[1].aid}})">See detail</el-link>
            </div>
          </div>
          <!--card for the third work-->
          <div v-if="works[2]" class="card">
            <div class="img">
              <img class="img" :src="works[2].img">
            </div>
            <div>
              <p style="display:inline;float: left;margin-left:10px; ">{{works[2].title}}</p>
              <el-link style="font-size: 15px;margin-top: 20px; margin-right: 10px;float: right; " type="primary" @click="$router.push({name:'article',params:{uid:userid,article_id:works[2].aid}})">See detail</el-link>
            </div>
          </div>
          <!--card for the fourth work-->
          <div v-if="works[3]" class="card">
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
      <!-- show user's collection if it is the current user's page-->
      <div v-if="isMyPage" class="sec">
        <div>
            <h2 class="title">My Collections</h2>
            <!--link to detailed result page-->
            <el-link @click="searchCollections" type="primary" style="font-size: 20px;margin-bottom: 10px">All
              <i class="el-icon-view el-icon--right"></i></el-link>
        </div>
        <!-- show the up tp 4 collections -->
        <div class="gallery">
          <div v-if="collections[0]" class="card">
            <div class="img">
              <img class="img" :src="collections[0].img">
            </div>
            <div>
              <p style="display: inline;float: left;margin-left:10px;">{{collections[0].title}}</p>
              <el-link style="font-size: 15px;margin-top: 20px; margin-right: 10px;float: right; " type="primary" @click="$router.push({name:'article',params:{uid:userid,article_id:collections[0].aid}})">See detail</el-link>
            </div>
          </div>
          <div v-if="collections[1]" class="card">
            <div class="img">
              <img class="img" :src="collections[1].img">
            </div>
            <div>
              <p style="display: inline;float: left;margin-left:10px; ">{{ collections[1].title }}</p>
              <el-link style="font-size: 15px;margin-top: 20px; margin-right: 10px;float: right; " type="primary" @click="$router.push({name:'article',params:{uid:userid,article_id:collections[1].aid}})">See detail</el-link>
            </div>
          </div>
          <div v-if="collections[2]" class="card">
            <div class="img">
              <img class="img" :src="collections[2].img">
            </div>
            <div>
              <p style="display:inline;float: left;margin-left:10px; ">{{collections[2].title}}</p>
              <el-link style="font-size: 15px;margin-top: 20px; margin-right: 10px;float: right; " type="primary" @click="$router.push({name:'article',params:{uid:userid,article_id:collections[2].aid}})">See detail</el-link>
            </div>
          </div>
          <div v-if="collections[3]" class="card">
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
      isMyPage: false,
      isEditting: false,
      works:[],
      collections:[],
      input_name: '',
      input_profile: '',
      input_avatar: '',
      input_banner: '',
      input_gender: '',

  }
  },
  created() {

    //the two userids are used to judge whether it is the current user's own page
    this.userid=this.$route.params.uid1;
    this.aid=this.$route.params.uid2;
    // the two userids are equal means it is the current user's page, set the isMyPage to be true
    if (this.userid==this.aid){
      this.isMyPage=true;
    }

    /*
     *get user information to bind in the website
     *the information contains user's avatar link, name, introduction and banner link
     */
    this.$http.post(
        "http://localhost:3000/user_page/admin/returnPersonalInfo",
        {_id:this.userid},
        {emulateJSON:true}).then(
            function(res){
              console.log(res);
              this.username=res.body.profile.uname;
              this.profile=res.body.profile.introduction;
              this.avatarLink= res.body.profile.picture;
              this.bannerLink= res.body.profile.banner;
              //this.works=res.docs.

            },
        function(res){
              console.log(res.status);
        }
    );

    /*
     * ask the server for user's works' information
     * the works will store in an array
     * only need the works' id, image link and title
     */
    this.$http.post(
        "http://localhost:3000/user_page/admin/returnPersonalArtical",
        {_id:this.userid},
        {emulateJSON:true}).then(
        function (res){
          console.log(res);
          for (let i=0;i<res.body.length;i++){
            this.works.push({aid:res.body[i]._id,title:res.body[i].title,img:'http://localhost:8081'+res.body[i].img[0]});
          }
          console.log(this.works)
        },
        function (res){
          console.log(res.status);
        }
    );

    /*
     * ask the server for user's collections' information
     * the collections will store in an array
     * only need the collections' id, image link and title
     */
    this.$http.post(
        "http://localhost:3000/user_page/admin/returnCollectedArtical",
        {_id:this.userid},
        {emulateJSON:true}).then(
        function (res){
          console.log(res);
          for (let i=0;i<res.body.length;i++){
            this.collections.push({aid:res.body[i]._id,title:res.body[i].title,img:'http://localhost:8081'+res.body[i].img[0]});
          }
          console.log(this.collections)
        },
        function (res){
          console.log(res.status);
        }
    );
    
  },
  methods:{
      /*
       * if the user click the edit profile button
       * will put the user's current information into boxes in case the user does not want to change some of them
       */
      edit_on: function(){
        this.isEditting=true
        this.input_name = this.username
        this.input_profile = this.profile
        this.input_avatar = this.avatarLink
        this.input_banner = this.bannerLink
        console.log("Open edit profile")
      },

      //save the changes of profile
      save_change:function (){
        let obj = {
          _id:this.userid,
          uname:this.input_name,
          introduction:this.input_profile,
          picture:this.input_avatar,
          banner:this.input_banner
        }
        //send the changes to the server to update the database
        this.$http.post(
            "http://localhost:3000/user_page/admin/editProfile",
            obj,
            {emulateJSON:true}).then(
                function (res){
                  console.log(res);
                  this.msg = res.body;
                  this.username = this.input_name;
                  this.profile=this.input_profile;
                  if(this.input_avatar!=='')
                  {
                      this.avatarLink = this.input_avatar
                  }
                  if(this.input_banner!=='')
                  {
                      this.bannerLink = this.input_banner
                  }
                },
                function (res){
                  console.log(res.status);
                }
        );
        //after saving, close the edit section
        this.isEditting = false
        this.$router.push({name:"user",params:{uid1:this.userid,uid2:this.userid}});  
      },

      //if cancel the editing, nothing will be send to the server
      cancel_change:function (){
        this.isEditting = false
        this.$router.push({name:"user",params:{uid1:this.userid,uid2:this.userid}});
      },

    // go to a search result page for all the user's works
    searchWorks:function (){
        this.$router.push({name:"result",params:{type:'3',uid:this.aid,keyword:"works"}})
    },

    // go to a search result page for all the user's collections
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
  margin-left:7%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  display: inline;
  float: left;
}
.img{
  width:210px;
  height: 200px;
}


</style>