import React, { useContext, useState, createContext, useEffect } from 'react'
import Loading from '../components/Loading'
import { getHomeOrders } from '../services/order'

// import {
//   Pusher,
//   PusherMember,
//   PusherChannel,
//   PusherEvent,
// } from '@pusher/pusher-websocket-react-native';
import Pusher from 'pusher-js/react-native'



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

interface RefuseAndCancel {
  code: string
  callback?: () => Promise<void>
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
  showRefuse: RefuseAndCancel | undefined
  setShowRefuse: React.Dispatch<
    React.SetStateAction<RefuseAndCancel | undefined>
  >
  showCancel: RefuseAndCancel | undefined
  setShowCancel: React.Dispatch<
    React.SetStateAction<RefuseAndCancel | undefined>
  >
  showFinish: RefuseAndCancel | undefined
  setShowFinish: React.Dispatch<
    React.SetStateAction<RefuseAndCancel | undefined>
  >
}

export const OrdersContext = createContext<ContextProps>({} as ContextProps)

interface ProviderProps {
  children: React.ReactNode
}

export const OrdersProvider: React.FC<ProviderProps> = ({ children }) => {
  const [region, setRegion] = useState<string>()
  const [order, setOrder] = useState<string | undefined>('desc')
  const [isLoading, setIsLoading] = useState(false)

  const [showSignout, setShowSignout] = useState(false)
  const [showRefuse, setShowRefuse] = useState<RefuseAndCancel | undefined>()
  const [showCancel, setShowCancel] = useState<RefuseAndCancel | undefined>()
  const [showFinish, setShowFinish] = useState<RefuseAndCancel | undefined>()

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
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  const channels = new Pusher('2d9eb68fbdf6e96af68d', {
    cluster: 'eu',
  })

  const initializePusher = () => {
    const channel = channels.subscribe('moovin-realtime')

    channel.bind('new-order', (data: getNewOrders[]) => {
      try {
        const obj = { ...response }
        obj.newOrders = obj.newOrders.concat([...data])
        setResponse(obj)
      } catch (error) {
        console.log(error)
      }
    })

    channel.bind('has-new-order', () => {
      try {
        handleGetData()
      } catch (error) {
        console.log(error)
      }
    })

    return channel
  }

  useEffect(() => {
    const channel = initializePusher()

    return channel.unsubscribe()
  }, [])

  console.log(response)

  useEffect(() => {
    handleGetData()
  }, [region, order])

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
        showRefuse,
        setShowRefuse,
        showCancel,
        setShowCancel,
        showFinish,
        setShowFinish,
      }}
    >
      {children}
      {isLoading && <Loading />}
    </OrdersContext.Provider>
  )
}

export const useOrders = (): ContextProps => useContext(OrdersContext)
