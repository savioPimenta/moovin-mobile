/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { GetOrdersData } from '../contexts/orderContext'
import api from './api'

export const getHomeOrders = async (
  region?: string,
  order?: string
): Promise<GetOrdersData> => {
  let query = '/orders?'
  if (region) {
    query += `region=${region}`
  }
  if (region && order) {
    query += '&'
  }
  if (order) {
    query += `order=${order}`
  }
  const response = await api.get(query)
  return response.data
}

export const getUniqueOrders = async (code: string) => {
  const response = await api.get(`/orders/${code}`)
  return response.data
}

export const acceptOrder = async (code: string, type: number) => {
  // 1 - Accept
  // 2 - Refuse
  // 3 - Cancel
  // 4 - Finish
  const response = await api.post(`/orders/${code}/update`, { type })
  return response.data
}

export const getReceipts = async (page: number) => {
  const response = await api.get('/orders/receipts?page=' + page)
  return response.data
}

export const getBalance = async () => {
  const response = await api.get('/users/balance')
  return response.data
}

export const withDraw = async (amount: number) => {
  const response = await api.post('/withdraw', {
    amount
  })
  return response.data
}
