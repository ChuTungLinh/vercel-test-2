import axios from '../axios'
import Cookies from "js-cookie";


const token = Cookies.get('token');
const name = Cookies.get('user');

export const saveAccount = (params) => {
  return axios({
    url: '/user/save',
    method: 'post',
    data: params,
  })
}

export const saveAccountWithCompany = (params) => {
  return axios({
    url: '/user/saveWithCompany',
    method: 'post',
    data: params,
  })
}

export const deleteAccount = (data) => {
  return axios({
    url: '/user/delete',
    method: 'post',
    data: data,
  })
}

export const blockAccount = (data) => {
  return axios({
    url: '/user/blockUser',
    method: 'post',
    data: data
  })
}

export const changePassword = (data) => {
  return axios({
    url: '/user/changePassword',
    method: 'post',
    data: data,
  })
}

export const changePasswordSelf = (data) => {
  return axios({
    url: '/user/changePasswordSelf',
    method: 'post',
    data: data,
  })
}

export const updateSelf = (data) => {
  return axios({
    url: '/user/updateSelf',
    method: 'post',
    data: data,
  })
}

export const findByName = (data) => {
  return axios({
    url: '/user/findByName',
    method: 'post',
    data: data,
  })
}

export const findAll = (data) => {
  return axios({
    url: '/user/findAll',
    method: 'post',
    data: data,
  })

}

export const showAccount = (data) => {
  return axios({
    url: '/user/show',
    method: 'post',
    data
  })
}

export const findUser = (data) => {
  return axios({
    url: '/user/findUser',
    method: 'post',
    data: data,
  })
}

export const userDownload = (data) => {
  return axios({
    url: '/user/userDownload',
    method: 'post',
    data: data,
    responseType: 'blob',

  })
}

export const checkAdmin = () => {
  return axios({
    url: '/user/check-admin',
    method: 'get'
  })
}

export const findPermissions = (params) => {
  return axios({
    url: `/user/findPermissions?name=${name}`,
    method: 'get',
    params
  })
}

export const insertEmployee = (data) => {
  return axios({
    url: 'AccountEmployee/insert',
    method: 'post',
    data: data
  })
}

export const findPageWithRoot = (data) => {
  return  axios({
      url: '/user/findPageWithRoot',
      method: 'post',
      data: data
  })
}

export const userDownloadWithCompany = (data) => {
  return axios({
    url: '/user/userDownloadWithCompany',
    method: 'post',
    data: data,
    responseType: 'blob',

  })
}

export const deleteAccountWithCompany = (data) => {
  return axios({
    url: '/user/deleteWithCompany',
    method: 'post',
    data: data,
  })
}

export const blockAccountWithCompany = (data) => {
  return axios({
    url: '/user/blockUserWithCompany',
    method: 'post',
    data: data
  })
}
export const findUserByName = () => {
  return axios({
    url: '/user/findUserByName',
    method: 'get'
  })
}
