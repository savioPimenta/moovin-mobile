import React, { useState } from 'react'
import { RefreshControl, View } from 'react-native'
import { getNewOrders, useOrders } from '../../contexts/orderContext'

import * as S from './styles'
import Dropdown from '../Dropdown'
import ServiceCard from '../ServiceCard'
import { orderByItems, regionItems } from './statics'

interface ServiceListProps {
  type: 'newOrders' | 'finishedOrders' | 'myOrders'
}

const ServiceList: React.FC<ServiceListProps> = ({ type }) => {
  const {
    orders,
    order,
    setOrder,
    region,
    setRegion,
    orderLoading,
    handleGetData,
  } = useOrders()

  const [allowScroll, setAllowScroll] = useState(true)

  return (
    <S.ServicesList
      refreshControl={
        <RefreshControl
          refreshing={orderLoading}
          onRefresh={handleGetData}
          progressViewOffset={60}
        />
      }
      nestedScrollEnabled
      scrollEnabled={true}
      contentContainerStyle={[
        { alignItems: 'stretch' },
        type !== 'newOrders' && { paddingTop: '15%' },
      ]}
      data={orders[type]}
      renderItem={({ item, index }) => {
        return (
          <>
            {index === 0 && type === 'newOrders' && (
              <S.FilterContainer>
                <Dropdown
                  itemList={regionItems}
                  placeholder="Region..."
                  value={region}
                  setValue={setRegion}
                  order={1}
                  orderInverse={2}
                  key={0}
                />
                <View style={{ width: 8 }} />
                <Dropdown
                  itemList={orderByItems}
                  placeholder="Order by..."
                  value={order}
                  setValue={setOrder}
                  order={2}
                  orderInverse={1}
                  key={1}
                />
              </S.FilterContainer>
            )}
            <ServiceCard
              item={item as getNewOrders}
              type={type === 'finishedOrders' ? 3 : type === 'myOrders' ? 2 : 1}
            />
          </>
        )
      }}
    ></S.ServicesList>
  )
}

export default ServiceList
