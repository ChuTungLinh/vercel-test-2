import axios from '../axios'

export const findAll = (data) => {
    return axios ({
        url: "priceobject/findAll",
        data: data,
        method:"post"
    })
}

export const findPage = (data) => {
    return axios ({
        url: "priceobject/findPage",
        data: data,
        method:"post"
    })
}

export const insert = (data) => {
    return axios ({
        url: "priceobject/insert",
        data: data,
        method:"post"
    })
}

export const update = (data) => {
    return axios ({
        url: "priceobject/update",
        data: data,
        method:"post"
    })
}

export const deleteBatch = (data) => {
    return axios ({
        url: "priceobject/deleteBatch",
        data: data,
        method:"post"
    })
}
export const findByID = (data) => {
    return axios ({
        url: "priceobject/findByID",
        data: data,
        method:"post"
    })
}

