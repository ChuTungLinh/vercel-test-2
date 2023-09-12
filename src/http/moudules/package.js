import axios from '../axios'

export const findByIsdn = (data) => {
  return axios({
    url: 'package/findByIsdn',
    method: 'post',
    data
  })
}

export const findById = (params) => {
  return axios({
    url: 'package/findById',
    method: 'get',
    params
  })
}
