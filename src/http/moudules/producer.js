import axios from '../axios'

export const findAll = (data) => {
    return axios({
        url: "producer/findAll",
        method: "post",
        data
    })
}
export const findPage = (data) => {
    return axios({
        url: "producer/findPage",
        method: "post",
        data
    })
}
export const insert = (data) => {
    return axios({
        url: "producer/insert",
        method: "post",
        data
    })
}
export const update = (data) => {
    return axios({
        url: "producer/update",
        method: "post",
        data
    })
}
export const deleteBatch = (data) => {
    return axios({
        url: "producer/deleteBatch",
        method: "post",
        data
    })
}