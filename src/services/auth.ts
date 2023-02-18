/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import api from './api'

import { AxiosResponse } from 'axios'

export const login = async (
  email: string,
  password: string
): Promise<AxiosResponse> => {
  try {
    const response = await api.post('/auth/signin', {
      email,
      password,
    })

    // api.defaults.headers.Authorization = 'Bearer ' + response.data.token

    return response
  } catch (err: any) {
    return err.response
  }
}

export const getResetCode = async (email: string) => {
  const response = await api.post('/auth/password/code', { email })
  return response
}

export const getUserApi = async () => {
  const response = await api.get('/users')
  return response
}

export const resetPassword = async (
  email: string,
  password: string,
  code: string
) => {
  const response = await api.post('/auth/password/reset', {
    email,
    password,
    code,
  })
  return response
}
