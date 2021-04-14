<template>
    <el-card :body-style="{ padding: '0px' }">
        
            <el-image v-for="imgsrc in imgsrcs" :key="imgsrc" :src="imgsrc"></el-image>
            
       
      
      <div style="padding: 14px;">
        <span>{{author_name}}</span>
        <div class="bottom clearfix">
          <time class="time">{{ currentDate }}</time>
          <el-button type="text" class="button">操作按钮</el-button>
        </div>
      </div>
    </el-card>
</template>

<script>
//import { defineComponent } from '@vue/composition-api'

export default{
    name: 'authorCard',

    data(){
        return {
            imgsrcs:['http://localhost:3000'+'/backend/uploads/20210412/a.jpg','http://localhost:3000'+'/backend/uploads/20210412/b.jpg'],
            author_name: 'kitty',
            currentData: '2021'

        }
    }

    
}
</script>
