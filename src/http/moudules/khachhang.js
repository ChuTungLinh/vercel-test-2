import axios from '../axios'
import Cookies from 'js-cookie'
const idcty = Cookies.get("id")
const token = Cookies.get('token')

export const showkhachhang = (data) => {
  return axios({
    url: '/customer/findAll',
    method: 'post',
    data:data,

  })
}

export const getCustomerInfo = (data) => {
  return axios({
    url: '/customer/getCustomerInfo',
    method: 'post',
    data:data,

  })
}


export const findCustomer = (data) =>{
  return axios({
    url:'/customer/findCustomer?id='+Cookies.get("id"),
    method:'post',
    data,
  })
}
export const findAll = (data) => {
  return axios({
  url:'/customer/findAll',
  method:'post',
  data,
  })
}

export const findPage = (data) => {
    return axios({
    url:'/customer/findPage',
    method:'post',
    data,
    })
}

export const update = (data) => {
  return axios({
    url:'/customer/update',
    method:'post',
    data,
    })
}

export const deleteBatch = (data) => {
  return axios({
    url:'/customer/deleteBatch',
    method:'post',
    data,
    })


}

