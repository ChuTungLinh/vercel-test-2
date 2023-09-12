<template>
    <label class="form-label">{{text}}</label>
</template>

<script>
  export default {
       props: {
            text: {
                type: String,
                description: ""
            },
       }
  }
</script>

<style scoped>
    .form-label {
        font-size: 14px;
        margin-right: 5px;
        /* align-self: flex-end; */
    }
    label {
        margin-bottom: 0px;
        
    }
</style>