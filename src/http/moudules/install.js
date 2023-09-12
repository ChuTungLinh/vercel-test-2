import Cookies from 'js-cookie'
import axios from '../axios'

const token = Cookies.get('token')

export const createInstallRequest = (data) => {
    return axios({
        url:'/install/createInstallRequest',
        method:'Post',
        data
    })
  }
  
  export const findInstallRequest = (data) => {
    return axios({
        url:'/install/findInstallRequest',
        method:'Post',
        data
    })
  }
  
  export const comfirmRequest = (data) => {
    return axios({
        url:'/install/comfirmRequest',
        method:'Post',
        data
    })
  }
  
  export const cancelRequest = (data) => {
    return axios({
        url:'/install/cancelRequest',
        method:'Post',
        data
    })
  }