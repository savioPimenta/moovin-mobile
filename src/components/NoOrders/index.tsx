import { BlurView } from 'expo-blur'
import AnimatedLottieView from 'lottie-react-native'
import React, { useRef } from 'react'
import {
  RefreshControl,
  ScrollView,
  View,
} from 'react-native'
import NoOrdersAnimation from '../../../assets/no-orders.json'
import { useOrders } from '../../contexts/orderContext'
import { colors } from '../../lib/colors'
import MyText from '../Text'

const NoOrders: React.FC = () => {
  const lottieViewRef = useRef<AnimatedLottieView>(null)
  const { orderLoading, handleGetData } = useOrders()

  return (
    <ScrollView
      style={{ flex: 1 }}
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
