import axios from "../axios";

export const bankShow = (data) =>{
    return axios({
        url:'bank/findAll',
        method:'post',
        data
    })
}


export const findAll = (data) => {
    return axios({
      url: '/bank/findAll',
      method: 'post',
      data: data,
    })
  }

  export const insert = (data) => {
    return axios({
      url: '/bank/insert',
      method: 'post',
      data: data,
    })
  }

  export const update = (data) => {
    return axios({
      url: '/bank/update',
      method: 'post',
      data: data,
    })
  }

  export const deleteBatch = (data) => {
    return axios({
      url: '/bank/deleteBatch',
      method: 'post',
      data: data,
    })
  }

  export const findPage = (data) => {
    return axios({
      url: '/bank/findPage',
      method: 'post',
      data: data,
    })
  }

