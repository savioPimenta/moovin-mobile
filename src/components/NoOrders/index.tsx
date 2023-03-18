import { BlurView } from 'expo-blur'
import AnimatedLottieView from 'lottie-react-native'
import React, { useRef } from 'react'
import { RefreshControl, ScrollView, View } from 'react-native'
import NoOrdersAnimation from '../../../assets/no-orders.json'
import { useOrders } from '../../contexts/orderContext'
import { colors } from '../../lib/colors'
import MyText from '../Text'
import * as S from '../../components/ServiceList/styles'
import Dropdown from '../Dropdown'
import { orderByItems, regionItems } from '../ServiceList/statics'

interface NoOrdersProps {
  isHome?: boolean
}

const NoOrders: React.FC<NoOrdersProps> = ({ isHome }) => {
  const lottieViewRef = useRef<AnimatedLottieView>(null)
  const { order, setOrder, region, setRegion, orderLoading, handleGetData } =
    useOrders()

  return (
    <ScrollView
      style={{ flex: 1, paddingHorizontal: 32 }}
      refreshControl={
        <RefreshControl
          refreshing={orderLoading}
          onRefresh={handleGetData}
          progressViewOffset={60}
        />
      }
      contentContainerStyle={{
        flex: 1,
      }}
    >
      {isHome && (
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
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 32,
        }}
      >
        <AnimatedLottieView
          onLayout={() => {
            lottieViewRef.current?.play()
          }}
          autoPlay
          ref={lottieViewRef}
          style={{
            width: 200,
            height: 200,
          }}
          source={NoOrdersAnimation}
        />
        <MyText
          style={{
            textAlign: 'center',
            color: colors.dark2,
            fontSize: 22,
            marginBottom: 8,
            fontFamily: 'Poppins_700Bold',
          }}
        >
          You don't have any orders yet
        </MyText>
        <MyText
          style={{ textAlign: 'center', color: colors.dark2, fontSize: 14 }}
        >
          We'll let you know as soon as a new order comes up.
        </MyText>
      </View>
    </ScrollView>
  )
}

export default NoOrders
