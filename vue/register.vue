<template>
    <div class="register">
    <el-form class="form" :rules="rules" :model="regform" ref="regform">
        <h1>Sign Up</h1>

        <el-form-item label="email" label-width="80px" prop="email">
            <el-input class="item" type = "text" v-model="regform.email"></el-input>
        </el-form-item>

        <el-form-item label="username" label-width="80px" prop="username">
            <el-input class="item" type = "text" v-model="regform.username"></el-input>
        </el-form-item>

        <el-form-item label="password" label-width="80px" prop="password">
            <el-input class="item" type="password" v-model="regform.password"></el-input>
        </el-form-item>

        <el-form-item label="repassword" label-width="80px" prop="repassword">
            <el-input class="item" type="password" v-model="regform.repassword"></el-input>
        </el-form-item>

        <p class="msg">{{tip}}</p>
        
        <el-button type="primary" @click="sendEmail">send code</el-button>
        
        <el-form-item label="code" label-width="40px" prop="code">
            <el-input class="item" type="text" v-model="regform.code"></el-input>
        </el-form-item>
        
        <router-link to="/login">Have Account? Sign In</router-link>

        <el-form-item>
            <el-button type="primary" @click="signUp">Sign Up</el-button>
        </el-form-item>

        </el-form>
    </div>
</template>

<script>
export default {
    data(){
        return{
            regform: {},
            code: '',
            tip: '',
            rules: {
                email: [
                    {required: true, message: "Please enter your email address", trigger: "blur"},
                    {type: 'email', message:"Please enter an valid email address", trigger: "blur"},
                ],
                username: [
                    {required: true, message: "Please enter your email address", trigger: "blur"},
                    {min: 1, max: 25, message: "max length: 25 characters", trigger: "blur"},
                ],
                password: [
                    {required: true, message: "Please enter your password", trigger: "blur"},
                    {min: 6, max: 20, message: "6-20 characters", trigger: "blur"}
                ],
                repassword: [
                    {required: true, message: "Please confirm your password", trigger: "blur"},
                    {min: 6, max: 20, message: "6-20 characters", trigger: "blur"}
                ]
                
            }

        }
    },

    methods: {
        sendEmail() {
            this.$refs["regform"].validate(valid => {
                if(valid){
                    if(this.regform.password !== this.regform.repassword)
                    {
                        this.tip = 'The two passwords are different!!!';
                        return false;
                    }
                    let data = {email: this.regform.email}
                    //data.append('username', this.regform.username);
                    this.$http.post(
                        'http://localhost:3000/api/plugin/sendEmail', 
                        data,
                        {emulateJSON: true})
                        .then(
                            function(res){
                                this.code = res.body.code;
                                console.log(res);
                                console.log(this.code);
                            }
                        );
                }
                else{
                    return false;
                }
            })
            
        },

        signUp() {
            this.$refs["regform"].validate(valid => {
                if(valid){
                    if(this.code != this.regform.code)
                    {
                        alert('Your Validation code is wrong. Please input again');
                        return false;
                    }
                    
                    let data = {
                        pwd:this.regform.password,
                        email:this.regform.email,
                        profile: {
                            uname: this.regform.username,
                            introduction:'',
                            banner:'',
                            picture:''
                        },
                        liked:[],
                        collected:[],
                        post:[],
                        message: [],
                        black_list:[],
                        is_banned: 0
                        
                    }

                    console.log(data)
                    this.$http.post(
                        'http://localhost:3000/api/main_page/addNewUser', 
                        {userInfo:data},
                        {emulateJSON: true})
                        .then(
                            function(res){
                            console.log(res);
                            if(res.body == 'exist')
                            {
                                alert("The email has registered. Please use another email or login")
                            }
                            if(res.ok)
                             alert('Now you can sign in')
                             this.$router.push('/login')
                            }
                        );
                }
                else{
                    return false;
                }
            })
        }
    }
        
}
</script>
