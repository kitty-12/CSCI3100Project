<template id="tmpl">
	<div id="Comment">
        <div v-for="comment in comments" :key="comment">
            {{comment}}
        </div>		
	</div>
</template>
<script>
export default{
    name:'Comment',
    props:
    ['aid'],
    data:function() {
        return{
            comments:[],
        }
    },

    mounted: function(){
        console.log(this.aid)
        this.$http.post(
            "http://localhost:3000/article/api/admin/articlePage1",
            {_id: this.aid},
            {emulateJSON: true},
        ).then(
            function(res){
            this.comments = res.body;
            console.log(this.comments);
            console.log(res.body);
        })
    }
}
</script>