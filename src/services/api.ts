import axios, { AxiosError } from 'axios'
import { API_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'

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
  async function (error: AxiosError) {
    if (error?.response?.status === 401) {
      await AsyncStorage.removeItem('@Moovin:token')
      console.log(error.request)
      delete api.defaults.headers.common.Authorization
    }
    return Promise.reject(error)
  }
)

export default api
