<template>
    <el-date-picker
        v-model="model"
        class="item-date-control"
        @change="onDateChange"
        type="month"
        format="MM/yyyy"
        >
    </el-date-picker>
</template>

<script>
   import { DatePicker } from 'element-ui' 

  export default {
    components: {
        [DatePicker.name] : DatePicker
    },
    
    data() {
        return {
            date: new Date()
        }
    },

    props: {
        value: {
            type: [Date],
            description: ""
        },
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

    methods: {
        onDateChange: function(val) {
            this.$props.value = val
            this.$emit('change', val)
        }        
    }

  }
</script>

<style scoped>
    .item-date-control {
        flex: auto;
        width: auto;
    }
</style>

<style >
    .item-date-control .el-input__inner {
        color: #000;
        border: 1px solid #b1b4b8;
        height: 1.6rem;
    }

    .item-date-control .el-input__icon {
        line-height: 1.6rem;
        height: 1.6rem;
    }
</style>