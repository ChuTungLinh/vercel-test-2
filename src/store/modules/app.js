export default {
    state: {
        menuRouteLoaded: false,    // Whether the menu and route have been loaded
        isAppLoading: true,
        appConfig: null,
        appLocale: 'en-us',
        isLogging: false,
        isDisconnected: false,
        xmppClient: null,
        authUser: '',
        rosterList: [],
        isLoadingRoster: true,
        noticeMutipleSort: false
    },
    getters: {
        collapse(state) {//  corresponds to the above state
            return state.collapse
        }
    },
    mutations: {
        onCollapse(state) {  // Change contraction
            state.collapse = !state.collapse
        },
        setThemeColor(state, themeColor) {  // change theme color
            state.oldThemeColor = state.themeColor
            state.themeColor = themeColor
        },
        menuRouteLoaded(state, menuRouteLoaded) {  // hange the loading state of menus and routes
            state.menuRouteLoaded = menuRouteLoaded;
        },
        noticeMutipleSort(state, noticeMutipleSort){
            // Notice user that they can multiple sort our table
            state.noticeMutipleSort = noticeMutipleSort
        }
    }
}
