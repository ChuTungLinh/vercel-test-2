import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import Cookies from "js-cookie";
import store from "../store"
import api from '@/http/api'

Vue.use(VueRouter);
Vue.use(routes)

// configure router
const router = new VueRouter({
  mode:'history',
  routes, // short for routes: routes
  linkActiveClass: 'active',
  scrollBehavior: (to, from ,savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  }
});


router.beforeEach((to, from, next) => {
  let token = Cookies.get('token');
  if (to.path === '/Home' || to.path === '/login' || to.path === '/TraCuu' || to.path ==='/YeuCau' 
  || to.path ==='/KhaoSat' || to.path ==='/Article' || to.path ==='/CheckOut' || to.path ==='/CheckOutFinish') {
    if (token) {
      next({path: '/'})
    } else {
      next()
    }
  }
  else {
    if (!token) {
      next({path: '/Home'})
    } else {
      let userName = Cookies.get('user')
      let id = Cookies.get('id')
      addDynamicMenuAndRoutes(userName,id)
      next()
    }
  }
});

function addDynamicMenuAndRoutes(userName,id) {
    if (store.state.app.menuRouteLoaded) return
    api.menu.findNavTree(userName)
    .then((response) => {    
        // Save loading state
        store.commit('menuRouteLoaded', true)
        // Save menu tree

       store.commit('setNavTree', response.data)

        api.account.findPermissions({'id':id})
        .then((response) => {
            // Save user rights ID collection
            store.commit('setPerms', response.data)
        })
    })
    .catch((error)=>{
        console.error(error)
    })
}

export default router;