import axios from '../axios'

export const updateSocialMedia = (data) => {
  return axios({
    url: '/company/updateSocialMedia',
    method: 'post',
    data
  })
}

export const findAccountCompany = () => {
    return axios({
      url: '/company/findAccountCompany',
      method: 'get',
    })
  }