<template>
    <section class=" bg-gray-1 pt-4 pb-2">
      <div class="container">
        <div class="row justify-content-center text-center">
          <div class="col-md-12">
            <h2 class="display-3 pb-1">Gói hot</h2>

            <div class="row">
              <div class="col-md-4" v-for="it in packageList" :key="it.id">
                <router-link :to="getRouterLink(it.id)" >
                  <div class="card">
                    <div class="card-body">
                        <img :src="it.image" >
                        <h3 class="pt-3 pb-1 text-left" >Gói {{it.maGoi}}</h3>
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
  import {baseUrl} from '@/util/global'

  export default {
    name: 'top-package-page',
    components: {
    },

    data() {
      return {
        packageList: [],
        token: '',
      }
    },

    methods: {
      getTopPackageList() {
        this.$api.common.getTopPackageList().then((res) => {
          if (res.code == 200) {
            let list = res.data
            for(let i = 0; i < list.length; i++) {
              if(list[i].image)
                  list[i].image = baseUrl + "/package/img/" + list[i].image
              else
                  list[i].image = "img/package.jpg"
            }
            this.packageList = list
          }            
          else
            this.packageList = []
        })
      },

      getToken() {
        this.token = this.$router.history.current.query.token
      },

      getRouterLink(id) {
        return "/detail?id="+id+"&token="+this.token
      }
    },

    mounted() {
      this.getToken()
      this.getTopPackageList()
    },
  }

</script>

<style scoped>
  .display-3 {
    font-size: 1.5rem;
    text-transform: uppercase;
  }

  .bg-gray-1 {
    background-color: #ebf0f4;
  }

  
  .card-header {
    padding: 0.5rem 0.5rem;
    background-color: #237bd3;
  }

  .card-header h5 {
    color: #fff;
  }

  .card-body{
    padding: 0.5rem;
  }

  .card {
    border: 1px solid #dfe0e4;
    margin-bottom: 20px;
  }

  .card-body img {
    max-width: 100%;
    min-height: 16px;
    border-radius: 0.5rem;
  }
  
</style>
