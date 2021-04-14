<template>
    <div class="makefanwork">
      <Navigator :uid="uid"></Navigator>
      <el-form class="form">
        <h3 class="header">Find your Creation!</h3>
        <el-input class="title" 
                  type = "text" 
                  v-model="title"
                  placeholder="title"
                  style="width: 40%">
        </el-input>

        <el-input
          class="text"
          type="textarea"
          :autosize="{ minRows: 16}"
          placeholder="Please input your text."
          v-model="content"
          style="width: 40%">
        </el-input>

        <el-switch
          style="display: block"
          v-model="choice"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="With Image"
          inactive-text="Text Only">
        </el-switch>

        <el-upload
          v-if="choice"
          class="img"
          ref="upload"
          :show-file-list="true"
          :limit="1"
          :action= actionUp
          :before-upload="beforeFile"
          :http-request="fileRequest"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :auto-upload = false
          list-type="picture">
          <el-button slot="trigger" size="small" type="primary">Choose img</el-button>
          <div slot="tip" class="el-upload_tip"></div>
        </el-upload>

        <el-tag
          :key="tag"
          v-for="tag in dynamicTags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)">
          {{tag}}
        </el-tag>

        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm">
        </el-input>

        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>

        <el-button size="small" type="success" @click="submitUpload">Create</el-button>

      </el-form>
    </div>
</template>

<script>
import Navigator from "./Navigator.vue";
    export default {
        data() {
            return {

              actionUp:'/api/upload',
              fileList:[],
              title:'',
              content:'',
              choice: true,
              uid:'6075fe1570e05207fc5570d3',

              articleInformation: {
                _id: '60760f433417094960f840aa',
                title: '',
                text: '',
                status: '0',
                tag: [],
                like: [],
                collect: [],
                img:[],
                time: '',
                hasImage: '1'
              },

              dynamicTags: [],
              inputVisible: false,
              inputValue: '',

            }
        },

        components: {
          Navigator,
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
            this.$axios.post('/upload/img',uploadData
            )
              .then(res =>{
                //console.log(res);
                console.log(res.data.path);
                this.articleInformation.img[0] = res.data.path
              })
          },

          submitUpload() {
            console.log(this.dynamicTags);
            let finalContent = this.content.replace(/\r\n/g, '<br>').replace(/\n/g, '<br>').replace(/\s/g,' ');

            this.articleInformation.tag = this.dynamicTags;

            if(this.choice !== true)
            {
              this.articleInformation.hasImage = '0';
              this.img = [];
            }
              

            this.articleInformation.time = Date;
            this.articleInformation.title = this.title;
            this.articleInformation.text = finalContent;
            this.articleInformation.status = '1';

            console.log(this.articleInformation);
            console.log(this.fileList.length);

            if(this.choice == true)
              this.$refs.upload.submit();

            this.$http.post(
                        "http://localhost:3000/create_Article/admin/updateArticle",
                        this.articleInformation,
                        {emulateJSON: true})
                        .then(
                            function (res) {
                                console.log(res.status);
                            }
                        );
            
          }, 

          handleClose(tag) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
          },

          showInput() {
            this.inputVisible = true;
            this.$nextTick(() => {
              this.$refs.saveTagInput.$refs.input.focus();
            });
          },

          handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
              this.dynamicTags.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
          },
        }
    }

</script>

<style scoped>
.header{
  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  margin-bottom: 20px;
}

.form {
  margin-top: 50px;
  margin-bottom: 100px;
}

.title {
  margin-bottom: 40px;
  position: absolute;
}

.text{
  margin-top: 60px;
}

.img{
  width: 40%;
  text-align: center;
  margin: 0 auto;
  margin-top: 20px;
}

.el-tag + .el-tag {
  margin-left: 10px;
}
  
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
  
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>