import axios from '../axios'

export const findPage = (data) => {
  return axios({
    url: 'packagereg/findPage',
    method: 'post',
    data
  })
}

export const findTotal = (data) => {
  return axios({
    url: 'packagereg/findTotal',
    method: 'post',
    data
  })
}

export const getOtp = (data) => {
  return axios({
    url: 'vasl/getOtp',
    method: 'post',
    data
  })
}

export const confirmOtp = (data) => {
  return axios({
    url: 'vasl/confirmOtp',
    method: 'post',
    data
  })
}