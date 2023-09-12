<template>
    <el-input
        v-model="model"
        :type="type"
        class="item-input"
        :class="[inputClasses]"
        :placeholder="placeholder"
        >
    </el-input>
</template>

<script>
  export default {
    props: {
        inputClasses: {
            type: String,
            description: "Input css classes"
        },
        value: {
            type: [String, Number],
            description: "Input value"
        },
        type: {
            type: String,
            description: "Input type",
            default: "text"
        },
        placeholder: {
            type: String,
            description: ""
        }
    },
    computed: {
      model: {
        get() {
          return this.value;
        },
        set(value) {
          this.$emit('input', value);
        }
      },
    },

  }
</script>
<style scoped>    
    .item-input{
        flex: auto;
        width: auto;
    }
</style>
<style>
.item-input .el-input__inner{
      height: 1.6rem;
      color: #000;
      border: 1px solid #b1b4b8;
    
    }
</style>