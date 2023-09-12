import axios from '../axios'


export const findAll = (data) => {
    return axios ({
        url: "RouteEmployee/findAll",
        method: "post",
        data: data
    })

}

export const findPage = (data) => {
    return axios ({
        url: "RouteEmployee/findPage",
        method: "post",
        data: data
    })
}
export const findPageFix = (data) => {
    return axios ({
        url: "RouteEmployee/findPageFix",
        method: "post",
        data: data
    })
}
export const saveFixRoute = (data) => {
    return axios ({
        url: "RouteEmployee/saveFixRoute",
        method: "post",
        data: data
    })
}


export const insert = (data) => {
    return axios ({
        url: "RouteEmployee/insert",
        method: "post",
        data: data
    })

}

export const update = (data) => {
    return axios ({
        url: "RouteEmployee/update",
        method: "post",
        data: data
    })


}

export const deleteBatch = (data) => {
    return axios ({
        url: "RouteEmployee/deleteBatch",
        method: "post",
        data: data
    })


}
export const findCSAmount = (data) => {
    return axios ({
        url: "RouteEmployee/findCSAmount",
        method: "post",
        data: data
    })
}
export const findRouteIntertwined = () => {
    return axios ({
        url: "RouteEmployee/findRouteIntertwined",
        method: "get"
    })
}

