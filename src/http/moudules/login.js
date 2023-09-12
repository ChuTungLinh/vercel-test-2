import axios from '../axios'
import Cookies from 'js-cookie'
import router from '@/routes/router';

export const login = (params) => {
  return axios({
    url: '/login',
    method: 'post',
    data: params,
    headers: { 'Content-Type': 'application/json' },
  })
}

export const updateToken = (data) => {
  return axios({
    url: '/loginByCompany',
    method: 'post',
    data: data
  })
}

export const logout = () => {
  // sessionStorage.removeItem("user")
  Cookies.remove("token")
  Cookies.remove("user")
  localStorage.removeItem("token")
  router.push("/login").catch((res) => {
    console.log(res)
  })
  return false;
}