<template>
    <div class="header bg-white pb-3">
        <div class="full-page">
            <vueper-slides  :touchable="true" bullets-outside >
            <vueper-slide
                v-for="(slide, i) in slides"
                :key="i"
                :image="slide.image"
                :title="slide.title"
                :content="slide.content"
                />
            </vueper-slides>
        </div>
    </div>
</template>

<script>
  import { VueperSlides, VueperSlide } from 'vueperslides'
  import 'vueperslides/dist/vueperslides.css'
  import {baseUrl} from '@/util/global'

  export default {
    name: 'slider-page',
    components: {
      VueperSlides, 
      VueperSlide,
    },

    data() {
      return {
        slides: []
      }
    },

    methods: {
      getSlideList() {
        this.$api.common.getSlideList().then((res) => {
            if(res.code == 200 && res.data) {
              for(let i = 0; i < res.data.length; i++) {
                const row = res.data[i]
                this.slides.push({title: '', content: '', image: baseUrl + "/package/img/" + row.imageName})
              }
            }             
        })
      }

     },

    mounted() { 
      this.getSlideList()
    },
  }

</script>

<style scoped>
  
</style>

<style>
  .vueperslides__bullet .default {
    background-color: rgba(0, 0, 0, 0.3);
    border: none;
    box-shadow: none;
    transition: 0.3s;
    width: 10px;
    height: 10px;
  }
  .vueperslides__bullet--active .default {
    background-color: #0761af;
  }
  .vueperslides__parallax-wrapper {
    padding-bottom: 25% !important;
  }

</style>