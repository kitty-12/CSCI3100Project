<template>
    <div>
      <el-form>
        <el-upload
          :show-file-list="false"
          :limit="1"
          :action= actionUp
          :before-upload="beforeFile"
          :http-request="fileRequest"
          :file-list="fileList">
          <el-button size="small" type="primary">上传</el-button>
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
          /**
           * 文件上传之前 判断格式
           * */
          beforeFile(file){
            let name = file.name
            if(name != '123')
                name = file.name;
            /*
            let type = name.substring(name.lastIndexOf('.')+1)
            if (type !== '') {
              this.$message('请上传word文件格式');
              return false
            }
            */
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