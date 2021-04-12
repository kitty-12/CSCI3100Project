<template>
    <div class="login">
    <el-form class="form" :rules="rules" :model="form" ref="form">
        <h1>Sign In</h1>

        <el-form-item label="email" label-width="80px" prop="email">
            <el-input class="item" type = "text" v-model="form.email"></el-input>
        </el-form-item>

        <el-form-item label="password" label-width="80px" prop="password">
            <el-input class="item" type="password" v-model="form.password"></el-input>
        </el-form-item>

        <router-link to="/register">New User? Register</router-link>

        <el-form-item>
            <el-button type="primary" @click="onSubmit">Sign In</el-button>
        </el-form-item>

        </el-form>
    </div>
</template>

<script>
//import { defineComponent } from '@vue/composition-api'

export default {
    data() {
        return {
            form: {},
            rules: {
                email: [
                    {required: true, message: "Please enter your email address", trigger: "blur"},
                    {min: 1}
                ],
                password: [
                    {required: true, message: "Please enter your password", trigger: "blur"},
                    {min: 6, max: 20, message: "6-20 characters", trigger: "blur"}
                ]
            }

        };
    },

    methods: {
        onSubmit() {
            this.$refs["form"].validate( valid => {
                if (valid) {
                    
                    this.$http.post(
                        "http://localhost:3000/test",
                        this.form,
                        {emulateJSON: true})
                        .then(
                            function (res) {
                                console.log(res);
                                if(res.body.msg === 'ok')
                                {
                                    this.$router.push("/home");
                                }
                                else{
                                    alert("Your email/ password is not valid!");
                                }
                            },
                            function (res) {
                                console.log(res.status);
                            }
                        );
                //this.$router.push("/home");
                }else {
                    return false;
                }
            });

        }
    }
};
</script>

<style scoped>
.login {
  background-color: #bcdef3;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.form {
  width: 40%;
  margin-bottom: 20vh;
  background-color: white;
  border-radius: 2px;
  padding: 5% 3%;
}
.item {
  width: 75%;
}
</style>