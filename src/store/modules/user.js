export default {
    state: {
      perms: [],  // User rights identity collection
      userInfo: {},
    },
    getters: {},
    mutations: {
      setPerms(state, perms) {  // User rights identity collection
        state.perms = perms;
      },
      setUserInfo(state, data) {
        state.userInfo = data;
      }
    },
    actions: {}
  }
  