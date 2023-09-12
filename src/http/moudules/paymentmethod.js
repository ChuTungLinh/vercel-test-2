import axios from '../axios'

export const findAll = (data) => {
    return axios ({
        url: "paymentmethod/findAll",
        data: data,
        method:"post"
    })
}

export const findPage = (data) => {
    return axios ({
        url: "paymentmethod/findPage",
        data: data,
        method:"post"
    })
}

export const insert = (data) => {
    return axios ({
        url: "paymentmethod/insert",
        data: data,
        method:"post"
    })
}

export const update = (data) => {
    return axios ({
        url: "paymentmethod/update",
        data: data,
        method:"post"
    })
}

export const deleteBatch = (data) => {
    return axios ({
        url: "paymentmethod/deleteBatch",
        data: data,
        method:"post"
    })
}

