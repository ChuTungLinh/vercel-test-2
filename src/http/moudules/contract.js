import Cookies from 'js-cookie'
import axios from '../axios'

const token = Cookies.get('token')

export const addqlhopdong = (data) => {
  return axios({
    url: '/contract/save',
    method: 'post',
    data:data,
    headers: {'Content-Type': 'multipart/form-data'},
  })
}

export const findContractDetail = (data) =>{
  return axios({
    url:'/contract/findContractDetail',
    method:'post',
    data,
  })
}

export const deletehopdong = (data) => {
  return axios({
    url: '/contract/delete',
    method: 'post',
    data:data,
    headers: {'Content-Type': 'application/json'}
  })
}
export const findContract = (data) =>{
  return axios({
    url: '/contract/findContractDetail',
    method:'post',
    data,
  })
}

export const deleteDocument = (data) =>{
  return axios({
    url: '/contract/deleteDocument',
    method:'post',
    data,
  })
}

export const addDocument = (data) => {
  return axios({
    url: '/contract/addDocument',
    method: 'post',
    data:data,
    headers: {'Content-Type': 'multipart/form-data'},
  })
}
export const changeClock = (data) => {
  return axios({
    url: '/contract/changeClock',
    method: 'post',
    data:data,
    headers: {'Content-Type': 'application/json'},
  })
}


export const findDocumentList = (data) =>{
  return axios({
    url: '/contract/findDocumentList',
    method:'post',
    data,
  })
}


export const downloadDocument = (data) => {
  return axios({
      url:'/contract/document?id=' + data,
      method:'get',
      responseType: 'blob',
  })
}
export const getQRClock = (data) => {
  return axios({
      url:'/contract/getQRClock',
      method:'post',
      data,
      responseType: 'blob',
  })
}
export const findRoutes = (data) => {
  return axios({
      url:'/contract/findRoutes',
      method:'Post',
      data
  })
}

export const createInstallRequest = (data) => {
  return axios({
      url:'/contract/createInstallRequest',
      method:'Post',
      data
  })
}

export const findInstallRequest = (data) => {
  return axios({
      url:'/contract/findInstallRequest',
      method:'Post',
      data
  })
}

export const comfirmRequest = (data) => {
  return axios({
      url:'/contract/comfirmRequest',
      method:'Post',
      data
  })
}

export const cancelRequest = (data) => {
  return axios({
      url:'/contract/cancelRequest',
      method:'Post',
      data
  })
}
