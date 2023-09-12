import axios from '../axios'

export const getUserInfo = () => {
  return axios({
    url: '/user/userinfo',
    method: 'get'
  })
}
