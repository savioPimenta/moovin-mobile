import React, { useContext, useState, createContext, useEffect } from 'react'
import Loading from '../components/Loading'
import Signout from '../components/Modals/Signout'
import { getHomeOrders } from '../services/order'
import { channels, useGeneral } from './generalContext'
import { useUser } from './userContext'

// import {
//   Pusher,
//   PusherMember,
//   PusherChannel,
//   PusherEvent,
// } from '@pusher/pusher-websocket-react-native';

export interface getNewOrders {
  id: number
  code: 'cd29c4'
  status: 1 | 2 | 3
  type: 1 | 2
  date: string
  distance: string
  originLat: string
  originLng: string
  originDesc: string
  originShort: string
  destinyLat: string
  destinyLng: string
  destinyDesc: string
  destinyShort: string
  value: string
  moovinTax: string
  hasPackage: true
  hasLoad: false
  rooms: number
  roomType: 1 | 2 | 3 | 4
  customerId: number
  created_at: string
  updated_at: string
  furnitures: {
    id: number
    orderId: number
    furnitureId: number
    qtd: number
    created_at: string
    updated_at: string
  }[]
}

export interface GetOrdersData {
  newOrders: getNewOrders[]
  finishedOrders: getNewOrders[]
  myOrders: getNewOrders[]
}

interface ContextProps {
  orders: GetOrdersData
  region: string | undefined
  setRegion: React.Dispatch<React.SetStateAction<string | undefined>>
  order: string | undefined
  setOrder: React.Dispatch<React.SetStateAction<string | undefined>>
  handleGetData: () => Promise<void>
  showSignout: boolean
  setShowSignout: React.Dispatch<React.SetStateAction<boolean>>
  orderLoading: boolean
}

export const OrdersContext = createContext<ContextProps>({} as ContextProps)

interface ProviderProps {
  children: React.ReactNode
}

export const OrdersProvider: React.FC<ProviderProps> = ({ children }) => {
  const { user } = useUser()
  const { showError } = useGeneral()
  const [region, setRegion] = useState<string>()
  const [order, setOrder] = useState<string | undefined>('desc')
  const [isLoading, setIsLoading] = useState(false)

  const [showSignout, setShowSignout] = useState(false)

  const [response, setResponse] = useState<GetOrdersData>({
    newOrders: [],
    finishedOrders: [],
    myOrders: [],
  })

  const handleGetData = async () => {
    setIsLoading(true)
    try {
      const res = await getHomeOrders(region, order)
      setResponse(res)
    } catch (error: any) {
      showError(error)
    }
    setIsLoading(false)
  }

  const initializePusher = () => {
    const channel = channels.subscribe('moovin-realtime')

    channel.bind('new-order', (data: getNewOrders[]) => {
      try {
        handleGetData()
      } catch (error: any) {
        showError(error)
      }
    })

    channel.bind('has-new-order', () => {
      try {
        handleGetData()
      } catch (error: any) {
        showError(error)
      }
    })

    return channel
  }

  useEffect(() => {
    initializePusher()
  }, [])

  useEffect(() => {
    if (user) handleGetData()
  }, [region, order, user])

  return (
    <OrdersContext.Provider
      value={{
        orders: response,
        region,
        setRegion,
        order,
        setOrder,
        handleGetData,
        showSignout,
        setShowSignout,
        orderLoading: isLoading,
      }}
    >
      {children}

      {showSignout && (
        <Signout setShowSignout={setShowSignout} showSignout={showSignout} />
      )}
      {isLoading && <Loading />}
    </OrdersContext.Provider>
  )
}

export const useOrders = (): ContextProps => useContext(OrdersContext)
