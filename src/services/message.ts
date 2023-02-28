/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import api from './api'

export const getMessages = async (orderId: number): Promise<any> => {
  const response = await api.get('/orders/message?orderId=' + orderId)
  return response.data
}

export const getCustomer = async (customerId: number): Promise<any> => {
  const response = await api.get('/users/customers?id=' + customerId)
  return response.data
}

export const sendMessage = async (
  orderId: number,
  message: string
): Promise<any> => {
  const response = await api.post('/users/message', {
    orderId,
    message,
  })
  return response.data
}