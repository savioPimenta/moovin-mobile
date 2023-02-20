import React from 'react'
import { View } from 'react-native'
import Dropdown from '../../components/Dropdown'
import NoOrders from '../../components/NoOrders'
import ServiceCard from '../../components/ServiceCard'
import { getNewOrders, useOrders } from '../../contexts/orderContext'
import { orderByItems, regionItems } from './statics'

import * as S from './styles'

const NewServices: React.FC = () => {
  const { orders, order, setOrder, region, setRegion } = useOrders()

  return (
    <S.Container>
      {orders?.newOrders.length > 0 ? (
        <S.ServicesList
          contentContainerStyle={{ alignItems: 'stretch' }}
          data={orders.newOrders}
          renderItem={({ item, index }) => {
            return (
              <>
                {index === 0 && (
                  <S.FilterContainer>
                    <Dropdown
                      itemList={regionItems}
                      placeholder="Filter by region..."
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
                <ServiceCard item={item as getNewOrders} type={1} />
              </>
            )
          }}
        ></S.ServicesList>
      ) : (
        <NoOrders />
      )}
    </S.Container>
  )
}

export default NewServices
