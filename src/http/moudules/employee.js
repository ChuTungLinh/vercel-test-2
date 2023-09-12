import axios from '../axios'
import Cookies from "js-cookie";

const token = Cookies.get('token');


export const findByComp = () => {
  return axios({
    url: '/employee/findByComp',
    method: 'get'
  })
}
export const showemployee = (data) =>{
  return axios({
      url:'/employee/findAll',
      method:'post',
      data
  })
}

export const findAll = (data) => {
  return axios({
      url:'/employee/findAll',
      method:'post',
      data
  })
}

export const findPage = (data) => {
  return axios({
      url:'/employee/findPage',
      method:'post',
      data,
  })

}

export const insert = (data) => {
  return axios({
      url:'/employee/insert',
      method:'post',
      data
  })


}

export const update = (data) => {
  return axios({
      url:'/employee/update',
      method:'post',
      data
  })

}

export const deleteBatch = (data) => {
  return axios({
      url:'/employee/deleteBatch',
      method:'post',
      data
  })



}
