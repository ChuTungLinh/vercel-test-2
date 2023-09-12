import axios  from "../axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");

export const findInvoiceSymbol = () =>{
    return axios({
        url:'invoice/getInvoiceSymbol',
        method: "get",
    })
}
export const releaseHDDT = (data)=>{
    return axios({
        url: 'invoice/releaseInvoice',
        method: 'post',
        data
    })
}
export const downloadHDDT = (data)=> {
    return axios({
        url: 'invoice/downloadInvoice',
        method: 'post',
        data,
        responseType: 'blob'
    })
}



export const findEBill = (data) =>{
    return axios({
        url:'/invoice/findEBill',
        method:'post',
        data
    })
}
export const syncEBill = (data) =>{
    return axios({
        url:'/invoice/syncEBill',
        method:'post',
        data
    })
}