import axios from '../axios'
import Cookies from "js-cookie";

const token = Cookies.get('token');

export const saveRole = (data) => {
  return axios({
    url: '/role/save',
    method: 'post',
    data: data,
    headers: {'Content-Type': 'application/json'}
  })
}

export const deleteRole = (data) => {
    return axios({
      url: '/role/delete',
      method: 'post',
      data: data,
      headers: {'Content-Type': 'application/json'}
    })
  }

  export const findPageRole = () => {
    return axios({
      url: '/role/findPage',
      method: 'post'
    })
  }

  export const findAll = (data) => {
    return axios({
      url: '/role/findAll',
      method: 'get',
      data: data,
      headers: { 'Authorization' : `Bearer ${token}` },
    })
  }

  export const findRoleMenu = (data) => {
    return axios({
      url: '/role/findRoleMenus',
      method: 'post',
      data: data,
      headers: { 'Authorization' : `Bearer ${token}` },
    })
  }
  
  export const saveRoleMenu = (data) => {
    return axios({
      url: '/role/saveRoleMenus',
      method: 'post',
      data: data,
      headers: { 'Authorization' : `Bearer ${token}` },
    })
  }

  export const findRole = (data) => {
    return axios({
      url: '/role/findRole',
      method: 'post',
      data: data,
      headers: { 'Authorization' : `Bearer ${token}` },
    })
  }

  export const findAllByCompany = () => {
    return axios({
      url: '/role/findAllByCompany',
      method: 'get',
    })
  }