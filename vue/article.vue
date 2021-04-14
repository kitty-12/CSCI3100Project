<template>
    <div class="articlePage">
        <Navigator :uid="uid"></Navigator>
    
        <h1 class="title">{{article.title}}</h1>

        <div class="info">
            <p class="info">{{article.author.uname}}</p>
            <p class="info">{{article.post_time}}</p>

            <div class="tags">
                    <el-tag
                        v-for="tag in tags"
                        :key="tag"
                        effect="plain">
                        {{tag}}
                    </el-tag>
            </div>
        </div>

        <div class="content">
            <el-image :src="imgsrc"></el-image>
            <br>
            <span  v-html="article.text">{{article.text}}</span>
        </div>

        <div class="action">
            <el-badge :value=article.read class="item">
                <el-button size="small" disabled round>View by {{article.read}}</el-button>
            </el-badge>

            <el-badge :value=article.like.length class="item">
                <el-button v-bind:class="{clicked: click1 == 1}" size="small" @click="likeArticle" round>Likes</el-button>
            </el-badge>

            <el-badge :value=article.collect class="item">
                <el-button v-bind:class="{clicked: click2 == 1}" size="small" @click="collect" round>Collect</el-button>
            </el-badge>
        </div>

        <div class="inputComment">
            <el-input
                class="text"
                type="textarea"
                :autosize="{ minRows: 4}"
                placeholder="Leave your comment here."
                v-model="comment"
                style="width: 40%">
            </el-input>
            <el-button size="small" @click="commentOn">Comment</el-button>
        </div>

        <div class="comment_area">
            <ul>
            <li v-for="showcomment in showcomments" :key="showcomment">
                {{showcomment}}
            </li>
            </ul>		
        </div>

    </div>
    
</template>

<script>
//import authorCard from './authorProfile.vue';
import Navigator from './Navigator.vue';
//import Comment from './comment.vue';

export default {
    name: 'article',

    data() {
        return {
            click1: 0,
            click2: 0,
            htmlText:'',
            imgsrc:"http://localhost:8081",
            article:{
                author: {
                    author_id: '',
                    uname: ''
                },
                title: String,
                text: String,
                img: [],
                post_time: Date,
                read: Number,
                like: [],
                collect: Number,
                tag: [],
                comments: [{
                    author_id: String,  // there may include all info that need to be displayed
                    time: Date,
                    text: String
                }]
            },
            comment: '',
            tags:[],
            article_id:'',
            uid:'',
            showcomments:[],
        }
    },

    components: {
        //authorCard,C
        Navigator,
        //Comment,
    },

    created: function(){
        this.article_id = this.$route.params.article_id;
        console.log(this.article_id)
        this.uid = this.$route.params.uid;
        console.log(this.uid)
        if(this.article_id =='undefined')
        {
            this.$alert('The article is empty. Please do NOT click on empty post. Return to mainpage', 'Tip', {
                confirmButtonText: 'Confirm',
                callback: action => {
                    this.$message({
                        type: 'info',
                        message: `action: ${ action }`
                    });
                }   
            });
            this.$route.push({name:"main",params: {uid: this.uid}})
        }
        
        this.$http.post(
            'http://localhost:3000/article/api/admin/articlePage', 
            {_id: this.article_id},
            {emulateJSON: true})
            .then(
                function(res){
                    this.article = res.body;
                    console.log(res.body.img[0]);
                    //console.log(res);
                    this.imgsrc='http://localhost:8081'+res.body.img[0]
                    console.log(this.imgsrc)
                    this.article,this.tag = res.body.tag;
                    this.article.img = res.body.img;
                    this.article.like = res.body.like;
                    this.tags = this.article.tag;
                }
            );
        this.htmlText = this.article.text;

        console.log(this.article_id)
        this.$http.post(
            "http://localhost:3000/article/api/admin/articlePage1",
            {_id: this.article_id},
            {emulateJSON: true},
        ).then(
            function(res){
            this.showcomments = res.body.comments;
            console.log(this.showcomments);
            console.log(res.body.comments);
        })
        //this.imgsrcs = this.article.img;
        //console.log(this.htmlText)
        //console.log(this.article)
        //console.log(this.article.img[0])
        //this.imgsrc = this.imgsrc + this.article.img[this.article.img.length-1]

    },

    methods: {
        likeArticle(){
            if(this.click1 == 1)
            {
                this.$notify({
                    title: 'Message',
                    message: 'You have liked this fanwork',
                    duration: 0
                });

                return
            }

            this.click1 = 1;
      
            let likeInfo = {
                article_id: this.article_id,
                likerid:this.uid,
                aid:this.article_id,

            };//user id

            this.$http.post(
                'http://localhost:3000/article/admin/like',
                likeInfo,
                {emulateJSON: true})
                .then(
                    function(res){
                        if(res.ok){
                            //this.article.like[this.article.like.length] = ''; //
                            this.click1 = 1;
                            this.$notify({
                                title: 'Message',
                                message: 'Thanks for your like ♥',
                                duration: 0
                            });
                        }
                    }
                );
        },

        commentOn(){
            let commentInfo = {
                user_id:this.uid,
                article_id:this.article_id,
                aid:this.article_id,
                Time:Date,
                Text:this.comment
            }
            console.log(commentInfo)
            this.$http.post(
                'http://localhost:3000/article/admin/createComment',
                commentInfo,
                {emulateJSON: true})
                .then(
                    function(res){
                        if(res.ok){
                            this.$notify({
                                title: 'Message',
                                message: 'Comment Success ♥',
                                duration: 0
                            });
                        }
                    }
                );

        },

        collect(){
            if(this.click2 == 1)
            {
                this.$notify({
                    title: 'Message',
                    message: 'You have collectd this fanwork',
                    duration: 0
                });

                return
            }
            let collectInfo = {
                user_id:this.uid,
                article_id:this.article_id,
            }
            //collectInfo.append(user)
            
            this.$http.post(
                'http://localhost:3000/article/admin/collect',
                collectInfo,
                {emulateJSON: true})
                .then(
                    function(res){
                        if(res.ok){
                            //this.article.like[this.article.like.length] = ''; //
                            this.article.collect += 1;
                            this.click2 = 1;
                            this.$notify({
                                title: 'Message',
                                message: 'Thanks for your collecting ♥',
                                duration: 0
                            });
                        }
                    }
                );
        }
    }
}

</script>

<style scoped>

.clicked {
    background-color: coral;
}

</style>>

