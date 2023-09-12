import axios from '../axios'

export const findAll = (data) => {
    return axios({
        url: "customertype/findAll",
        method: "post",
        data
    })
}
export const findPage = (data) => {
    return axios({
        url: "customertype/findPage",
        method: "post",
        data
    })
}
export const insert = (data) => {
    return axios({
        url: "customertype/insert",
        method: "post",
        data
    })
}
export const update = (data) => {
    return axios({
        url: "customertype/update",
        method: "post",
        data
    })
}
export const deleteBatch = (data) => {
    return axios({
        url: "customertype/deleteBatch",
        method: "post",
        data
    })
}