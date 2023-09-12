import axios from '../axios'

export const findPage = (data) => {
    return axios({
      url: '/pipes/find-types',
      method: 'post',
      data
    })
  }

  export const addType = (data) => {
    return axios({
      url: '/pipes/add-type',
      method: 'post',
      data
    })
  }
  
  export const deleteType = (data) => {
    return axios({
      url: '/pipes/delete-type',
      method: 'post',
      data
    })
  }

  export const updateType = (data) => {
    return axios({
      url: '/pipes/update-type',
      method: 'post',
      data
    })
  }


  

  export const addPipe = (data) => {
    return axios({
      url: '/pipes/add-pipe',
      method: 'post',
      data
    })
  }

  export const updatePipe = (data) => {
    return axios({
      url: '/pipes/update-pipe',
      method: 'post',
      data
    })
  }

  export const deletePipe = (data) => {
    return axios({
      url: '/pipes/delete-pipe',
      method: 'post',
      data
    })
  }

  export const findPipePage = (data) =>{
    return axios({
      url: '/pipes/find-pipe-by-company',
      method: 'post',
      data
    })
  }

  export const createPipeReport = (data) =>{
    return axios({
      url: '/pipes/create-pipe-report',
      method: 'post',
      data
    })
  }

  export const findPipeReport = (data) =>{
    return axios({
      url: '/pipes/findPipeReport',
      method: 'post',
      data
    })
  }

  export const requestMaintenance = (data) =>{
    return axios({
      url: '/pipes/requestMaintenance',
      method: 'post',
      data
    })
  }

  export const cancelRequest = (data) =>{
    return axios({
      url: '/pipes/cancelRequest',
      method: 'post',
      data
    })
  }

  export const completeRequest = (data) =>{
    return axios({
      url: '/pipes/completeRequest',
      method: 'post',
      data
    })
  }

  export const downloadPipeReport = (data) => {
    return axios({
        url:'/pipes/downloadPipeReport',
        method:'post',
        data,
        responseType: 'blob',
    })
}
