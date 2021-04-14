<template>
    <div>
      <el-button type="primary" @click="fakeCreate">Create</el-button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
              
            }
        },
        methods: {
          fakeCreate(){
            let form = {
              author: {
                author_id:'6075a17f501e7649d4313288',
                uname: 'mononoke'
              },
              title: '',
              text: '',
              img: [],
              post_time: '',
              read: 0,
              like: [],
              collect: 0,
              tag: [],
              comments: []
            }

            this.$http.post(
              "http://localhost:3000/create_article/admin/createArticle",
               {articleInformation: form},
               {emulateJSON: true})
               .then(
                 function(res){
                   console.log(res)
                   console.log(res.body)
                 }
               )
            

          }
        }
    }
</script>