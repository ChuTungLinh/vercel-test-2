import axios from '../axios'
import Cookies from "js-cookie";
const idcty = Cookies.get("id")
const token = Cookies.get('token');

export const findByEmp = (data) => {
  return axios({
    url: '/route/findByEmp',
    method: 'post',
    data
  })
}
export const showroute = (data) =>{
  return axios({
      url:'/route/show',
      method:'post',
      data,
      headers: { 'Authorization' : `Bearer ${token}` },
  })
}
export const showById = (data) =>{
  return axios({
      url:'/route/showById?id='+Cookies.get("id"),
      method:'post',
      data,
  })
}

export const showByName = (data) =>{
  return axios({
      url:'/route/showByName?id='+Cookies.get("id"),
      method:'post',
      data,
  })
}


export const findAll = (data) => {
  return axios ({
      url: "route/findAll",
      data: data,
      method:"post"
  })
}
export const findNonFix = (data) => {
  return axios ({
      url: "route/findNonFix",
      data: data,
      method:"post"
  })
}

export const findPage = (data) => {
  return axios ({
      url: "route/findPage",
      data: data,
      method:"post"
  })
}

export const insert = (data) => {
  return axios ({
      url: "route/insert",
      data: data,
      method:"post"
  })
}

export const update = (data) => {
  return axios ({
      url: "route/update",
      data: data,
      method:"post"
  })
}

export const deleteBatch = (data) => {
  return axios ({
      url: "route/deleteBatch",
      data: data,
      method:"post"
  })
}

