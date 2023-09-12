import axios from '../axios'

export const findAll = (data) => {
    return axios ({
        url: "recordstatus/findAll",
        data: data,
        method:"post"
    })
}

export const findPage = (data) => {
    return axios ({
        url: "recordstatus/findPage",
        data: data,
        method:"post"
    })
}

export const insert = (data) => {
    return axios ({
        url: "recordstatus/insert",
        data: data,
        method:"post"
    })
}

export const update = (data) => {
    return axios ({
        url: "recordstatus/update",
        data: data,
        method:"post"
    })
}

export const deleteBatch = (data) => {
    return axios ({
        url: "recordstatus/deleteBatch",
        data: data,
        method:"post"
    })
}

