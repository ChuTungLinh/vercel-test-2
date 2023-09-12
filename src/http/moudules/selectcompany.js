import axios from '../axios'


export const selectcompany = (data) => {
  return axios({
    url: '/company/findByUserId',
    method: 'post',
    data:data,
  })
}