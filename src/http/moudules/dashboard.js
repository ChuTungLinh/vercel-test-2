import axios from '../axios'

export const top4Criteria = (data) => {
  return axios({
    url: '/dashboard/top4Criteria',
    method: 'get',
    data
  })
}

export const top6MonthsRevenue = (data) => {
  return axios({
    url: '/dashboard/top6MonthsRevenue',
    method: 'get',
    data
  })
}

export const top6MonthsRevenueByGroupCustomer = (data) => {
  return axios({
    url: '/dashboard/top6MonthsRevenueByGroupCustomer',
    method: 'get',
    data
  })
}