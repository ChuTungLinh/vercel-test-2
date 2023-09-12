import axios from "../axios";


export const findAll = (data) =>{
    return axios({
        url:'/bill/findAll',
        method:'post',
        data
    })
}

export const dowloadPaymentPDF = (data) => {
    return axios({
        url: 'bill/paymentDownloadPDF',
        method: 'post',
        data,
        responseType: 'blob',
    })
}
export const billdPDF = (data) => {
    return axios({
        url:'/bill/billdPDF',
        method:'post',
        data,
        responseType: 'blob',
    })
}

export const findPagePayment = (data) =>{
    return axios({
        url:'/bill/findPagePayment',
        method:'post',
        data
    })

}


export const payment = (data) =>{
    return axios({
        url:'/bill/payment',
        method:'post',
        data
    })
}

export const findPagePrintBill = (data) =>{
    return axios({
        url:'/bill/findPagePrintBill',
        method:'post',
        data
    })

}

export const paymentDownload = (data) =>{
    return axios({
        url:'/bill/paymentDownload',
        method:'post',
        data,
        responseType: 'blob',
    })

}



export const deleteBatch = (data) => {


    return axios({
        url:'/bill/deleteBatch',
        method:'post',
        data
    })
}

export const billXlsx = (data) => {


    return axios({
        url:'/bill/paymentDownload',
        method:'post',
        data,
        responseType: 'blob',
    })
}

export const billpdfPC = (data) => {


    return axios({
        url:'/bill/paymentDownloadPDFPC',
        method:'post',
        data,
        responseType: 'blob',
    })
}

export const paymentList = (data) =>{
    return axios({
        url:'/bill/paymentList',
        method:'post',
        data
    })
}

export const paymentList2 = (data) =>{
    return axios({
        url:'/bill/paymentList2', 
        method:'post',
        data
    })
}

export const updateRecord = (data) => {
    return axios({
      url:'/bill/updateRecord',
      method:'post',
      data
    })
  }
export const changePriceObject = (data) => {
    return axios({
      url:'/bill/change-price-object',
      method:'post',
      data
    })
  }

  export const paymentData = (data) => {
    return axios({
      url:'/bill/paymentData',
      method:'post',
      data
    })
  }

  export const findBillByOrder = (data) => {
    return axios({
      url:'/bill/findBillByOrder',
      method:'post',
      data
    })
  }