import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex);

import app from './modules/app'
import user from './modules/user'
import menu from './modules/menu'
import record from './modules/record';
import company from './modules/company';

const store = new vuex.Store({
    modules: {
       user,
       menu,
      app,
      record,
      company
    }
  })
export default store
  