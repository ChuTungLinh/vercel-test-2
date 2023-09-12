import axios from '../axios'
import Cookies from "js-cookie";
// const idcty = Cookies.get("id")

export const showPayment = (data)=>{
    return axios({
        url:'/paymentmethod/findAll',
        method:'post',
        data
    })
}