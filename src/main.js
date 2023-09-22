import Vue from 'vue';
import DashboardPlugin from './plugins/dashboard-plugin';
import App from './App.vue';
import api from './http'
import store from './store'
import moment from 'moment'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import ElementUI from 'element-ui'
import { Message } from 'element-ui'
import locale from 'element-ui/lib/locale/lang/vi'
import 'leaflet/dist/leaflet.css'
import * as VueGoogleMaps from 'vue2-google-maps'
// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@/assets/style.css'
// router setup
import router from './routes/router';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

// plugin setupy


import { inject } from '@vercel/analytics';


Vue.use(inject)

Vue.use(DashboardPlugin);
Vue.use(api)
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.prototype.moment = moment
Vue.use(ElementUI,{ locale })
Vue.prototype.$message = (options) => {
  return Message(Object.assign({
    // showClose: true,
    duration: 5000,
    ...options
  }))
}

//google map
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAJeVcAe5Vc_ov0E3nPnCmFUMIZe7nPsCk',
    libraries: "places"
  },
})

/* add icons to the library */
library.add(faUserSecret)

/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)


Vue.config.productionTip = false
/* eslint-disable no-new */
// export const bus = new Vue();
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
