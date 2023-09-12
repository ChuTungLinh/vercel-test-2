import {baseUrl} from '@/util/global'

export default {
  method: 'get',
  //  base url prefix
  baseUrl: baseUrl,
  // request header information
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
  },
  // parameter
  data: {},
  //  set timeout
  timeout: 100000,
  //  bring credentials
  withCredentials: true,
  // return data type
  responseType: 'json'
}

