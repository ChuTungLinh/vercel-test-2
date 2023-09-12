import axios from '../axios'

export const getTopPackageList = () => {
  return axios({
    url: '/getTopPackageList',
    method: 'post'
  })
}

export const getSlideList = () => {
  return axios({
    url: '/getSlideList',
    method: 'get'
  })
}
