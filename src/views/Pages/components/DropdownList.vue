<template>
    <el-select v-model="model" clearable :placeholder="placeholder" class="item-select" @change="onChange">
        <slot></slot>
    </el-select>
</template>

<script>

   import {  Select, Option } from 'element-ui' 

  export default {
    components: {
        [Select.name] : Select,
        [Option.name] : Option
    },
    props: {
        value: {
            type: String,
            description: ""
        },
        placeholder: {
            type: String,
            description: ""
        }      
    },

    methods: {
      onChange (val) {
        this.$emit('onChange', val);
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
    .item-select {
        flex: auto;
        width: auto;
    }
</style>

<style >
    .item-select .el-input__inner {
        color: #000;
        border: 1px solid #b1b4b8;
        height: 1.6rem !important;
    }

    .item-select .el-input__icon {
        line-height: 1.6rem;
    }
</style>