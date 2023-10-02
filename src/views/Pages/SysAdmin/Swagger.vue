<template>
    <div>
        <div style="padding:20px">
            <el-button @click="handlePickFile" type="primary">select</el-button>
        </div>
        <div id="swagger-ui"></div>
    </div>
  </template>
  <script>
  import SwaggerUI from 'swagger-ui'
  import 'swagger-ui/dist/swagger-ui.css'
  export default {
      name: "Swagger",
      data(){
        return{
            selected:null
        }
      },
      watch:{
        selected(){
            
        }
      },
      methods:{
        handlePickFile(){
            let input = document.createElement('input');
            input.type = 'file';
            
            input.onchange = _ =>{
                var reader = new FileReader(); 
                reader.onload = onReaderLoad;
                function onReaderLoad(event){
                    var obj = JSON.parse(event.target.result);
                    this.selected = obj
                    SwaggerUI({
                        spec: this.selected,
                        dom_id: '#swagger-ui',
                    })
                }
                reader.readAsText(input.files[0]);
            }
            input.click();
        }
      },
      mounted() {
      } 
  }
  </script>