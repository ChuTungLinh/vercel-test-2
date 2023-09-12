import axios from '../axios'
import Cookies from "js-cookie";
const token = Cookies.get('token');

export const getTerm = (data) => {
  return axios({
    url: `/term/show?id=${localStorage.getItem('id')}`,
    method: 'post',
    data:data,
    headers: { 'Authorization' : `Bearer ${token}` },
  })
}

export const findAll = (data) => {
  return axios ({
      url: "term/findAll",
      data: data,
      method:"post"
  })
}

export const findPage = (data) => {
  return axios ({
      url: "term/findPage",
      data: data,
      method:"post"
  })
}

export const insert = (data) => {
  return axios ({
      url: "term/insert",
      data: data,
      method:"post"
  })
}

export const update = (data) => {
  return axios ({
      url: "term/update",
      data: data,
      method:"post"
  })
}

export const deleteBatch = (data) => {
  return axios ({
      url: "term/deleteBatch",
      data: data,
      method:"post"
  })
}


