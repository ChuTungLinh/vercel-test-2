import axios from '../axios'

export const createAnswer = (data)=>{
    return axios({
        url:'/question/createAnswer',
        method:'post',
        data
    })
}

export const findPageQuestion = (data)=>{
    return axios({
        url:'/question/findPageQuestion',
        method:'post',
        data
    })
}

export const createQuestion = (data)=>{
    return axios({
        url:'/question/createQuestion',
        method:'post',
        data
    })
}

export const editQuestion = (data)=>{
    return axios({
        url:'/question/editQuestion',
        method:'post',
        data
    })
}

export const activateQuestion = (data)=>{
    return axios({
        url:'/question/activateQuestion',
        method:'post',
        data
    })
}

export const deactivateQuestion = (data)=>{
    return axios({
        url:'/question/deactivateQuestion',
        method:'post',
        data
    })
}

export const deleteQuestion = (data)=>{
    return axios({
        url:'/question/deleteQuestion',
        method:'post',
        data
    })
}

export const findResult = (data)=>{
    return axios({
        url:'/question/findResult',
        method:'post',
        data
    })
}

export const findOverall = (data)=>{
    return axios({
        url:'/question/findOverall',
        method:'post',
        data
    })
}