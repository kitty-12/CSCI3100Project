<!--
    * @File Description: Admin page, to ban user and make announcement
    * @Contributor: XUAN Zitong
    * @Last Edit Date: 2021/4/30
-->

<template>
  <div id="Admin">
    <h2 style="font-size: 80px;">Admin</h2>
    <div style="margin-bottom: 20px;">
      <p style="font-size: 20px;">Ban User</p>
      <div style="width: 100%;float: left;margin-left: 30%">
        <el-input style="float: left;width:40%;margin-left: 5px;margin-bottom: 20px" v-model="input1" placeholder="Please enter the user you want to ban"></el-input>
        <el-button @click="ban" style="float:left;margin-left:5%" type="warning">Ban!</el-button>
      </div>
      </div>
    <div style="margin-top: 20px">
      <p style="font-size: 20px;margin-top:20px ">Send Announcement</p>
      <div style="width: 100%;float: left;margin-left: 30%">
        <el-input style="float: left;width:40%;margin-left: 5px" v-model="input2" placeholder="Please enter the announcement"></el-input>
        <el-button @click="sendAnc" style="float:left;margin-left:5%" type="primary">Send</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "Admin",
  data:function (){
  return {
    input1:'', // banned user email
    input2:'', // announcement text
    uid: ''
  }
},
created: function(){
  this.uid = this.$route.params.uid;
  if(this.uid !== 'donuts_team@aliyun.com')
  {
    this.$router.push('/login');
  }
},
  methods:{
    ban:function (){
        console.log(this.input1)
      this.$http.get(
          "http://localhost:3000/api/admin/ban",
          {params:{input1:this.input1}},
          {emulateJSON:true}).then(
          function(res){
            console.log(res);
          },
          function(res){
            console.log(res.status);
          }
      );
    },
    sendAnc:function (){
      this.$http.get(
          "http://localhost:3000/api/admin/announce",
          {params:{input2:this.input2}},
          {emulateJSON:true}).then(
          function(res){
            console.log(res);
          },
          function(res){
            console.log(res);
          }
      );
    },
    }
}
</script>

<style scoped>
</style>
