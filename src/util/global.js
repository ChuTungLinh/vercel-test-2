import axios from "axios"

export const baseUrl = process.env.VUE_APP_API_URL || 'https://watersupply.mobifone5.vn/WaterCompany'
//http://localhost:6005
//https://watersupply.mobifone5.vn/WaterCompany
axios.defaults.headers.common['token'] = +localStorage.getItem('token')
// https://kinhdoanhnuoc.mobifone5.vn:8893/WaterCompany

export default {
    baseUrl
}
