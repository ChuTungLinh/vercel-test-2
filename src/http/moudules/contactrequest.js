
import axios from '../axios'

export const createContactRequest = (data) => {
    return axios({
        url:'contact/createContactRequest',
        method:'Post',
        data
    })
}
  
export const findContactRequest = (data) => {
    return axios({
        url:'contact/findContactRequest',
        method:'Post',
        data
    })
}
  
export const comfirmRequest = (data) => {
    return axios({
        url:'contact/comfirmRequest',
        method:'Post',
        data
    })
}
  
export const cancelRequest = (data) => {
    return axios({
        url:'contact/cancelRequest',
        method:'Post',
        data
    })
}