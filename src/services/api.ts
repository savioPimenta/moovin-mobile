import axios, { AxiosError } from 'axios'
import { API_URL } from '@env'

export const baseURL = API_URL

const api = axios.create({
  baseURL,
})

api.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function (error: AxiosError) {
    if (error?.response?.status === 401) {
      localStorage.removeItem('@Moovin:token')
      delete api.defaults.headers.common.Authorization
    }
    return Promise.reject(error)
  }
)

export default api
