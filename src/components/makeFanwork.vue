<template>
    <div>
      <el-form>
        <el-input class="">
        <el-upload
          :show-file-list="false"
          :limit="1"
          :action= actionUp
          :before-upload="beforeFile"
          :http-request="fileRequest"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :list-type="picture">
          <el-button size="small" type="primary">Upload</el-button>
          <div slot="tip" class="el-upload_tip">
        </el-upload>
      </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
              actionUp:'/api/upload',
              fileList:[],
            }
        },
        methods: {
          handleRemove(file,fileList){
            console.log(file,fileList);
          },

          handlePreview(file){
            console.log(file);
          },

          beforeFile(file){
            let name = file.name
            if(name != '123')
                name = file.name;

          },

          fileRequest(item) {
            let uploadData = new FormData()
            uploadData.append('file',item.file)
            this.$axios.post('/upload',uploadData
            )
              .then(res =>{
                console.log(res);
              })
          }
        }

    }
</script>