import axios from "../axios";

export const Testing = (data) => {
    return axios({
        url:'/checkOut/Testing',
        method:'post',
        data
    })
 }

