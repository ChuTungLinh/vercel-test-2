import axios from '../axios'

export const findAll = (data) => {
  return axios({
    url: '/status/findAll',
    method: 'post',
    data
  })
}
