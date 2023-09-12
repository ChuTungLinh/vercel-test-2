import axios from "../axios";
import Cookies from 'js-cookie'
export const findBySerial = (data) =>{
    return axios({
        url:'/clock/findAll',
        method:'post',
        data
    })
}

export const findAll = (data) => {
    return axios({
        url:'/clock/findAll',
        method:'post',
        data
    })
 }

export const findPage = (data) => {
    return axios({
        url:'/clock/findPage',
        method:'post',
        data
    })
 }


export const insert = (data) => {
    return axios({
        url:'/clock/insert',
        method:'post',
        data
    })
 }

export const insertMC = (data) => {
    return axios({
        url:'/clock/insertMC',
        method:'post',
        data
    })
 }
export const updateMC = (data) => {
    return axios({
        url:'/clock/updateMC',
        method:'post',
        data
    })
 }
export const setupMC = (data) => {
    return axios({
        url:'/clock/setupMC',
        method:'post',
        data
    })
 }


export const update = (data) => {
    return axios({
        url:'/clock/update',
        method:'post',
        data
    })
 }


export const deleteBatch = (data) => {
    return axios({
        url:'/clock/deleteBatch',
        method:'post',
        data
    })
 }
export const deleteMC = (data) => {
    return axios({
        url:'/clock/deleteMC',
        method:'post',
        data
    })
 }


export const findWaitList = () => {
    return axios({
        url:'/clock/findWaitList',
        method:'get'
    })
 }
export const findMotherClock = (data) => {
    return axios({
      url:'/clock/findMClock',
      method:'post',
      data
    })
  }

  export  const findClockRemain = (data) =>{
    return axios({
      url:'/clock/findClockRemain',
      method:'post',
      data
    })
  }
