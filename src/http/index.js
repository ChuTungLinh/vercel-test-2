// Import all interfaces
import api from './api'

const install = Vue => {
  if (install.installed)
    return;

  install.installed = true;

  Object.defineProperties(Vue.prototype, {
    // Note that this is mounted on the $ api object of the Vue prototype
    $api: {
      get() {
        return api
      }
    }
  })
}

export default install
