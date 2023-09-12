
import axios from "../axios";
import Cookies from "js-cookie";
const token = Cookies.get('token');

export const getRecord = (data) => {
        return axios ({
                url: `record/findPage?id=${localStorage.getItem('id')}`,
                method: 'post',
                data: data,
                header: {'Content-Type': 'application'}
        })
}

export const findByTerm = (data) => {
    return axios ({
            url: `record/findByTerm?id=${localStorage.getItem('id')}`,
            method: 'post',
            data: data,
            headers: { 'Authorization' : `Bearer ${token}` },
    })
}
export const showDT = (data)=>{
    return axios({
        url:'/record/showDT',
        method:'post',
        data
    })
}

export const getBill = (data) => {
    return axios ({
      url: '/record/getBillQR',
      method: 'post',
      data
    })
  }


export const save = (data)=>{
    return axios({
        url:'record/insertRecord?id='+Cookies.get("id"),
        method:'post',
        data
    })
}

export const saveRecord = (data)=>{
    return axios({
        url:'record/save',
        method:'post',
        data
    })
}

export const findRecordDT = (data)=>{
    return axios({
        url:'/record/findRecordDT',
        method:'post',
        data
    })
}
export const recordDownload = (data) => {
    return axios({
      url: '/record/recordDownload',
      method: 'post',
      responseType: 'blob',
      data
    })
  }

  export const sendProof = (data) => {
    return axios({
      url: '/record/sendProof',
      method: 'post',
      headers: {'Content-Type': 'multipart/form-data'},
      data
    })
  }

export const recordUpload = (data) => {
    return axios({
      url: '/record/recordUpload',
      method: 'post',
      headers: {'Content-Type': 'multipart/form-data'},
      data
    })
  }

export const updateServiceFee = (data) => {
    return axios({
      url: '/record/updateServiceFee',
      method: 'post',
      data
    })
  }

export const stop = (data) => {
    return axios({
      url:'/record/stop',
      method:'post',
      data
    })

}

export const start = (data) => {
    return axios({
      url:'/record/start',
      method:'post',
      data
    })

}

export const open = (data) => {
    return axios({
      url:'/record/open',
      method:'post',
      data
    })
}

export const close = (data) => {
    return axios({
      url:'/record/close',
      method:'post',
      data
    })

}


export const lockAndBill = (data) => {
    return axios({
      url:'/record/lockAndBill',
      method:'post',
      data
    })
}

export const deleteBatch = (data) => {
  return axios({
    url:'/record/deleteBatch',
    method:'post',
    data
  })
}

export const getRecordData = (data) => {
  return axios({
    url:'/report/getRecordData',
    method:'post',
    data
  })
}