import axios from "../axios"


export const findWaterUsageReport = (data) => {
    return axios({
        url: '/report/water-usage',
        method: 'post',
        data: data,
        headers: {'Content-Type': 'application/json'}
    })
}
export const findWaterSalesReport = (data) => {
    return axios({
        url: '/report/water-sales',
        method: 'post',
        data: data,
        headers: {'Content-Type': 'application/json'}
    })
}

export const recordByYear = (data) => {
    return axios({
        url: 'report/recordByYear',
        method: 'post',
        data: data,
        headers: {'Content-Type': 'application/json'}
    })
}

export const recordByYearDownload = (data) => {
    return axios({
        url:'/report/recordByYearDownload',
        method:'post',
        data,
        responseType: 'blob',
        timeout: 400000,
    })
}

export const recordWaterUsageDownload = (data) => {
    return axios({
        url:'/report/water-usage-download',
        method:'post',
        data,
        responseType: 'blob',
    })
}

export const recordWaterSalesDownload = (data) => {
    return axios({
        url:'/report/water-sales-download',
        method:'post',
        data,
        responseType: 'blob',
    })
}

export const findLog = (data) => {
    return axios({
        url: 'report/reportLog',
        method: 'post',
        data
    })
}