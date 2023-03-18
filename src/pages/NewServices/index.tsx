import React from 'react'
import { View } from 'react-native'
import Dropdown from '../../components/Dropdown'
import NoOrders from '../../components/NoOrders'
import ServiceCard from '../../components/ServiceCard'
import { getNewOrders, useOrders } from '../../contexts/orderContext'
import { orderByItems, regionItems } from '../../components/ServiceList/statics'

import * as S from './styles'
import ServiceList from '../../components/ServiceList'

const NewServices: React.FC = () => {
  const { orders } = useOrders()

  return (
    <S.Container>
      {orders?.newOrders.length > 0 ? (
        <ServiceList type="newOrders" />
      ) : (
        <NoOrders isHome />
      )}
    </S.Container>
  )
}

export default NewServices
