import Cookies from 'js-cookie'
import axios from '../axios'

const token = Cookies.get('token')

export const addchucnang = (data) => {
  return axios({
    url: '/menu/save',
    method: 'post',
    data:data,
    headers: {'Content-Type': 'application/json'}
  })
}

export const viewchucnang = (data) => {
  return axios({
    url: '/menu/show',
    method: 'post',
    data:data,
  })
}

export const editchucnang = (data) => {
  return axios({
    url: '/editqlchucnang',
    method: 'post',
    data:data,
  })
}

export const deletechucnang = (data) => {
  return axios({
    url: '/menu/delete',
    method: 'post',
    data:data,
  })
}

export const findMenuTree = () => {
  return axios({
    url: '/menu/findMenuTree',
    method: 'get',
  })
}
export const findMenu = (data) => {
  return axios({
    url: '/menu/findMenu',
    method: 'post',
    data,
  })
}

export const findNavTree = (userName) => {

  return axios({
    url: `/menu/findNavTree`,
    method: 'get',
  })
}