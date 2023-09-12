import axios from '../axios'

export const findAll = () => {
  return axios({
    url: '/period/findAll',
    method: 'get'
  })
}
