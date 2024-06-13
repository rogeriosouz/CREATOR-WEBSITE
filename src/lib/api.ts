import { env } from '@/env'
import { deleteCookie } from '@/utils/deleteCookie'
import axios from 'axios'

export const api = axios.create({
  baseURL: env.VITE_URL_API,
  withCredentials: true,
})

api.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response && [401, 403].includes(error.response.status)) {
      deleteCookie('expired-at-auth-user')
    }
    return Promise.reject(error)
  },
)
