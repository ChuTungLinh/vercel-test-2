import axios from "../axios";

  export const findClockForMap = (data) => {
    return axios({
      url: '/map/findClockForMap',
      method: 'post',
      data: data,
    })
  }
  export const updateFromMap = (data) => {
    return axios({
      url: '/contract/updateFromMap',
      method: 'post',
      data: data,
    })
  }
  export const findRoutesForMap = (data) => {
    return axios({
      url: '/contract/findRoutesForMap',
      method: 'post',
      data: data,
    })
  }

