import axios from 'axios';
import config from './config';
import router from '@/routes/router';
import * as login from './moudules/login';

import Cookies from 'js-cookie'


export default function $axios(options) {

  let source = axios.CancelToken.source();

  setTimeout(() => {
      source.cancel("Kết nối đến máy chủ tạm thời bị gián đoạn. Vui lòng thử lại sau.");
  }, 300000);

  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: config.baseUrl,
      headers: config.headers,
      timeout: config.timeout,
      cancelToken: source.token,
      withCredentials: config.withCredentials
    })

    // request interceptor
    instance.interceptors.request.use(
      config => {
        let token = Cookies.get("token")
        if(token) {
          config.headers.token = token
        }
        config.headers.key = 1
        return config
      },

      error => {
        const errorInfo = error.response
        if (errorInfo) {
          error = errorInfo.data 
          const errorStatus = errorInfo.status; // 404 403 500 ...
        }
        return error
      }
    )

    //response interceptor
    instance.interceptors.response.use(
      response => {
        return response.data
      },
      err => {
        if (err && err.response) {
          switch (err.response.status) {
            case 400:
              err.message = 'Request error'
              break
            case 401:
              err.message = 'Unauthorized, please log in'
              break
            case 403:
              err.message = 'access denied'
              break
            case 404:
              err.message = `Request address error: ${err.response.config.url}`
              break
            case 408:
              err.message = 'Request timed out'
              break
            case 500:
              err.message = 'Internal server error'
              break
            case 501:
              err.message = 'Service is not implemented'
              break
            case 502:
              err.message = 'Gateway error'
              break
            case 503:
              err.message = 'service is not available'
              break
            case 504:
              err.message = 'Gateway timeout'
              break
            case 505:
              err.message = 'Unsupported HTTP version'
              break
            default:
          }
        }
        return {code: 400, msg: err.message} // Returns the error information returned by the interface
      }
    )

    // Request processing
    instance(options).then(res => {
      if (res.code == 403)
        login.logout()
        resolve(res)
        return false
    }).catch(error => {
        if (error.toString().includes('Network Error')) {
          login.logout()
        } else if (typeof error.response != "undefined") {
          if (error.response.status == 401 || error.response.status == 403) {
            login.logout()
          }
        }
        reject(error)
    })

  })
}
