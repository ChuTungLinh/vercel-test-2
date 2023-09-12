import axios from '../axios'
import Cookies from "js-cookie";
// const idcty = Cookies.get("id")
export const showPrice = (data)=>{
    return axios({
        url:'/price/show?id='+Cookies.get("id"),
        method:'post',
        data
    })
}


export const findPage = (data) => {
    return axios ({
        url: "price/findPage",
        data: data,
        method:"post"
    })
}

export const insert = (data) => {
    return axios ({
        url: "price/insert",
        data: data,
        method:"post"
    })
}

export const update = (data) => {
    return axios ({
        url: "price/update",
        data: data,
        method:"post"
    })
}

export const deleteBatch = (data) => {
    return axios ({
        url: "price/deleteBatch",
        data: data,
        method:"post"
    })
}

export const findGiaDT = (data) => {
    return axios ({
        url: "price/findPriceDtByHdId",
        data: data,
        method:"post"
    })
}

