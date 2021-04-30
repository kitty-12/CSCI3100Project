<!--
    * @File Description: login box
    * @Last Edit Date: 2021/4/30
-->

<template>
    <div class="login">
    <el-form class="form" :rules="rules" :model="form" ref="form">
        <h1>Sign In</h1>

        <el-form-item label="email" label-width="80px" prop="email">
            <el-input class="item" type = "text" v-model="form.email" prefix-icon="el-icon-message"></el-input>
        </el-form-item>

        <el-form-item label="pwd" label-width="80px" prop="pwd">
            <el-input class="item" type="password" v-model="form.pwd" prefix-icon="el-icon-key"></el-input>
        </el-form-item>

        <router-link to="/register">New User? Register</router-link>

        <el-form-item>
            <el-button class="button" type="primary" @click="onSubmit">Sign In</el-button>
        </el-form-item>

        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {},
            rules: {
                email: [
                    {required: true, message: "Please enter your email address", trigger: "blur"},
                    {type: 'email', message:"Please enter a valid email address", trigger: "blur"},
                ],
                pwd: [
                    {required: true, message: "Please enter your password", trigger: "blur"},
                    {min: 6, max: 20, message: "6-20 characters", trigger: "blur"}
                ]
            }

        };
    },

    methods: {
        /**
         * post the login form to server, if correct, go to next page, else show message
         */
        onSubmit() {
            this.$refs["form"].validate( valid => {
                if (valid) {
                    console.log(this.form);

                    // check whether it is admin login or normal user
                    if(this.form.email == 'donuts_team@aliyun.com')
                    {
                        if(this.form.pwd == 'donuts0414'){
                            this.$router.push({name:"Admin",params: {uid:this.form.email}})
                            return
                        }
                    }

                    let postform = {
                        email:this.form.email,
                        pwd:this.form.pwd
                    }
                    
                    this.$http.post(
                        "http://localhost:3000/api/main_page/login",
                        postform,
                        {emulateJSON: true})
                        .then(
                            function (res) {
                                console.log(res);
                                if(res.body.msg == '1')
                                {
                                    // the password correct
                                    console.log(res.body.uid)
                                    this.$router.push({name:"main",params: {uid:res.body.uid}})
                                }
                                else{
                                    // the password incorrect
                                    alert("Your email/ password is not valid!");
                                }
                            },
                            function (res) {
                                console.log(res.status);
                            }
                        );
                }else {
                    // Invalid input, not to post
                    return false;
                }
            });

        },

        
    }
};
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center ;
  justify-items: center;
  height: 100vh;
  /* background-image: linear-gradient(120deg, #ffba9a 0%, #d57eeb 100%); */
  background-image: linear-gradient(135deg, #b1d8fc 0%, #f1c7fd 48%, #faa5c5 100%);
  background-repeat: no-repeat;
  background-size: auto 100%;
  margin: 0%;
  height: 100vh;
  display: flex;
  align-items: center;
}
.form {
  border-radius:  20px;
  display: flex;
  flex-direction: column;
  min-width:max-content;
  margin: auto;
  text-align: center;
  padding: auto;
  opacity: 90%;
  width: 40%;
  background-color: white;
  padding: 5% 3%;
}
.item {
  width: 75%;
  margin-top: 20px;
}

.button {
    border-radius: 10px;
    margin-top: 20px;
    font-size: 20px;
    padding: 5px;
    border-color: #5b3a5b;
    background-color: #ffffff;
    color:#5b3a4b;
    width: 180px;
    height: 45px;
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
</style>
