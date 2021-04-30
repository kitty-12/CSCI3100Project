<!--
    * @File Description: Article page, view the article, like, collect, comment on the article, add to blacklist
    * @Last Edit Date: 2021/4/30
-->

<template>
    <div class="articlePage">
        <Navigator :uid="uid"></Navigator>
    
        <h1 class="title">{{article.title}}</h1>

        <div class="info">
            <p class="info">{{article.author.uname}}</p>
            <el-link type='primary' @click="$router.push({name:'user',params:{uid1:article.author.author_id,uid2:uid}})">See page</el-link>
            <p class="info">{{article.post_time}}</p>

            <div class="tags">
                    <el-tag
                        class='tag'
                        v-for="tag in tags"
                        :key="tag"
                        closable
                        effect="plain"
                        @close='addBlacklist(tag)'>
                        {{tag}}
                    </el-tag>
            </div>
        </div>

        <div class="content">
            <el-image :src="imgsrc"></el-image>
            <span  v-html="article.text" style="margin-top: 20px">{{article.text}}</span>
        </div>

        <br>
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
        
        <br>
        <div class="inputComment">
            <el-input
                class="text"
                type="textarea"
                :autosize="{ minRows: 4}"
                placeholder="Leave your comment here."
                v-model="comment"
                style="width: 40%">
            </el-input>
            <br>
            <el-button size="small" @click="commentOn" style="margin-top:20px">Comment</el-button>
        </div>

        <br>
        <div class="comment_area">
            <p>Comments:</p>
            <ul>
            <li v-for="showcomment in showcomments" :key="showcomment">
                {{showcomment}}
            </li>
            </ul>		
        </div>

    </div>
    
</template>

<script>

import Navigator from './Navigator.vue';
//import Comment from './comment.vue';

export default {
    name: 'article',

    data() {
        return {
            click1: 0, // check whether like is clicked
            click2: 0, // check whether collect is clicked
            htmlText:'', // the text of the article in html format
            imgsrc:"http://localhost:8081",  // the img url
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
                comments: []
            },
            comment: '', // user input comment
            tags:[],  // tags shown in the page
            article_id:'', 
            uid:'', // user id
            showcomments:[], // comments shown in the comment_area
            likenum:Number,
        }
    },

    components: {
        Navigator,
        //Comment,
    },

    created: function(){

        // get the article id and uid passed from other components
        this.article_id = this.$route.params.article_id;
        console.log(this.article_id)
        this.uid = this.$route.params.uid;
        console.log(this.uid)
        
        // get article content
        this.$http.post(
            'http://localhost:3000/api/article/articlePage', 
            {_id: this.article_id},
            {emulateJSON: true})
            .then(
                function(res){
                    this.article = res.body;
                    //console.log(res.body.img[0]);
                    console.log(res);
                    this.imgsrc='http://localhost:8081'+res.body.img[0]
                    console.log(this.imgsrc)
                    this.article,this.tag = res.body.tag;
                    this.article.img = res.body.img;
                    this.article.like = res.body.like;
                    this.tags = this.article.tag;
                }
            );
        this.htmlText = this.article.text;
        this.likenum = this.article.like.length

        console.log(this.article.img)

        //get comments of this article
        this.$http.post(
            "http://localhost:3000/api/article/articlePage1",
            {_id: this.article_id},
            {emulateJSON: true},
        ).then(
            function(res){
            this.showcomments = res.body.comments;
            //console.log(this.showcomments);
            console.log(res);
        })

        //this.imgsrcs = this.article.img;
        //console.log(this.htmlText)
        //console.log(this.article)
        //console.log(this.article.img[0])
        //this.imgsrc = this.imgsrc + this.article.img[this.article.img.length-1]

        // check whether article id undefined, if empty, push to main page
        if(!this.article_id)
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
            this.$router.push({name:"main",params: {uid: this.uid}})
        }

    },

    methods: {

        // like the article
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
            };//user id

            this.$http.post(
                'http://localhost:3000/api/article/like',
                likeInfo,
                {emulateJSON: true})
                .then(
                    function(res){
                        if(res.ok){
                            if(res.body == '0')
                                this.article.like.push(''); //
                            this.click1 = 1;
                            if(res.body == '0')
                                this.$notify({
                                    title: 'Message',
                                    message: 'Thanks for your like ♥',
                                    duration: 0
                                });
                            else{
                                this.$notify({
                                    title: 'Message',
                                    message: 'You have liked this fanwork',
                                    duration: 0
                                    });
                            }
                        }
                    }
                );
        },

        // make comments
        commentOn(){
            let commentInfo = {
                user_id:this.uid,
                article_id:this.article_id,
                Time:Date,
                Text:this.comment
            }
            console.log(commentInfo)
            this.$http.post(
                'http://localhost:3000/api/article/createComment',
                commentInfo,
                {emulateJSON: true})
                .then(
                    function(res){
                        if(res.ok){
                            if(res.body.message =='ban')
                            {
                                this.$notify({
                                title: 'Message',
                                message: 'You are not allowed to comment.',
                                duration: 0
                                });
                            }else{
                                this.$notify({
                                    title: 'Message',
                                    message: 'Comment Success ♥',
                                    duration: 0
                                });

                                //this.$router.push({name:'article',params:{uid:this.uid, article_id:this.article_id}})

                                this.$http.post(
                                    "http://localhost:3000/api/article/articlePage1",
                                    {_id: this.article_id},
                                    {emulateJSON: true},
                                ).then(
                                    function(res){
                                        this.showcomments = res.body.comments;
                                        console.log(this.showcomments);
                                        console.log(res.body.comments);
                                })
                            }
                        }
                        console.log(res)
                    }
                );
            
        },

        // collect the article
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
                'http://localhost:3000/api/article/collect',
                collectInfo,
                {emulateJSON: true})
                .then(
                    function(res){
                        if(res.ok){
                            //this.article.like[this.article.like.length] = ''; //
                            if(res.body =='0')
                                this.article.collect += 1;
                            this.click2 = 1;
                            if(res.body =='0')
                                this.$notify({
                                    title: 'Message',
                                    message: 'Thanks for your collecting ♥',
                                    duration: 0
                                });
                            else{
                                this.$notify({
                                    title: 'Message',
                                    message: 'You have collectd this fanwork',
                                    duration: 0
                                });
                            }
                        }
                    }
                );
        },

        // add the tag to blacklist
        addBlacklist(tag){
            this.$confirm('Add to Blacklist', 'Tip', {
                confirmButtonText: 'Yes',
                cancelButtonText: 'Cancel',
                type: 'warning'
                }).then(() => {

                    let info = {
                        _id: this.uid,
                        tag: tag
                        }
                    this.$http.post(
                        'http://localhost:3000/api/user_page/addBlacklist',
                        info,
                        {emulateJSON: true})
                    .then(
                        function(res){
                            if(res.ok){
                                this.$notify({
                                    title:'Message',
                                    message: 'You have added this tag to blacklist :(',
                                    duration: 0
                                });
                            }
                        }
                    );
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: 'Cancelled'
                    });          
                });
            
        }
    }
}

</script>

<style scoped>

.clicked {
    background-color: coral;
}

.tags{
    margin: auto;
    margin-bottom: 20px;
}

.tag{
    margin-left: 10px;
}

.comment_area{
    margin: auto;
    margin-bottom: 20px;
    margin-top:10px;
    text-align: left;
    align-items: left;
    display: flex;
    flex-direction: column;
    width: 40%;
}

.content{
    margin: auto;
    margin-bottom: 20px;
    margin-top:30px;
    text-align: left;
    align-items: left;
    display: flex;
    flex-direction: column;
    width: 40%;
}

.inputComment{
    display: flex;
    margin:auto;
    text-align: center;
    align-items: center;
    flex-direction: column;
}

.action .item{
    margin-left: 40px;
}
</style>>

