import axios from '../axios'

export const findAll = (data) => {
    return axios({
        url: "clocktype/findAll",
        method: "post",
        data
    })
}
export const findPage = (data) => {
    return axios({
        url: "clocktype/findPage",
        method: "post",
        data
    })
}
export const insert = (data) => {
    return axios({
        url: "clocktype/insert",
        method: "post",
        data
    })
}
export const update = (data) => {
    return axios({
        url: "clocktype/update",
        method: "post",
        data
    })
}
export const deleteBatch = (data) => {
    return axios({
        url: "clocktype/deleteBatch",
        method: "post",
        data
    })
}