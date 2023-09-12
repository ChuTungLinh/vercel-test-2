import axios from '../axios'
import Cookies from "js-cookie";
const token = Cookies.get('token');

export const companyInfor = (data) => {
  return axios({
    url: '/company/show',
    method: 'post',
    data: data,
    headers: {'Content-Type': 'application/json'}
  })
}

export const updateClockExcel = (data) => {
  return axios({
    timeout:300000,
    url: '/company/updateClockExcel',
    method: 'post',
    data: data,
    headers: {'Content-Type': 'multipart/form-data'}
  })
}
export const updateCustomerExcel = (data) => {
  return axios({
    timeout:300000,
    url: '/company/updateCustomerExcel',
    method: 'post',
    data: data,
    headers: {'Content-Type': 'multipart/form-data'}
  })
}

export const getLogo = () => {
  return axios({
    url: '/company/getLogo',
    method: 'get',
  })
}

export const deleteCompany = (data) => {
  return axios({
    url: '/company/deleteBatch',
    method: 'post',
    data: data,
    headers: {'Content-Type': 'application/json'}
  })
}

export const updateCompany = (data) => {
  return axios({
    url: '/company/update',
    method: 'post',
    data: data,
      headers: { 'Authorization' : `Bearer ${token}` },
  })
}
export const chooseOptionMC = (data) => {
  return axios({
    url: '/company/choose-option-mc',
    method: 'post',
    data: data,
  })
}
export const getTaxCode = () => {
  return axios({
    url: '/company/get-tax-code',
    method: 'get',
  })
}
export const saveTaxCode = (data) => {
  return axios({
    url: '/company/save-tax-code',
    method: 'post',
    data: data,
  })
}
export const downloadClockTemplate = (data) => {
  return axios({
    url: '/company/downloadClockTemplate',
    method: 'post',
    data: data,
    responseType: 'blob',
  })
}
export const downloadCustomerTemplate = (data) => {
  return axios({
    url: '/company/downloadCustomerTemplate',
    method: 'post',
    data: data,
    responseType: 'blob',
  })
}
export const findOptionMC = () => {
  return axios({
    url: '/company/find-option-mc',
    method: 'get',
  })
}


export const saveCompany = (data) => {
  return axios({
    url: '/company/save',
    method: 'post',
    data: data,
    headers: {'Content-Type': 'application/json'}
  })
}

export const findCompany = (data) => {
  return axios({
    url: '/company/findCompany',
    method: 'post',
    data: data,
    headers: { 'Authorization' : `Bearer ${token}` },
  })
}

export const companyDownload = (data) => {
  return  axios({
      url: '/company/companyDownload',
      method: 'post',
      data: data,
      responseType: 'blob',

  })
}

export const findAll = () => {
  return axios({
    url: '/company/findAll',
    method: 'get'
  })
}

export const downloadResult = (data) => {
  return axios({
    url: '/company/downloadResult',
    method: 'post',
    data: data,
    responseType: 'blob',
  })
}

export const processIMG = (data) => {
  return axios({
    url: '/company/processIMG',
    method: 'post',
    data: data,
  })
}

export const processSignature = (data) => {
  return axios({
    url: '/company/processSignature',
    method: 'post',
    data: data,
  })
}

export const duplicateCheck = (data) => {
  return axios({
    url: '/company/duplicateCheck',
    method: 'post',
    data: data,
  })
}

export const findCompanyByToken = (data) => {
  return axios({
    url: '/company/findCompanyByToken',
    method: 'post',
    data: data,
  })
}

export const getCountData = (data) => {
    return axios({
    url: '/homePage/getCountData',
    method: 'post',
    data: data,
  })
}