import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs'
import React from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { colors } from '../../lib/colors'
import Asset from '../../../assets/header.svg'
import * as S from './styles'
import { AntDesign } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'
import MyText from '../Text'
import { useUser } from '../../contexts/userContext'
import { useOrders } from '../../contexts/orderContext'
import { StackActions, useNavigation } from '@react-navigation/native'

const CustomHeader: React.FC<{ props: BottomTabHeaderProps }> = ({ props }) => {
  const insets = useSafeAreaInsets()
  const { user } = useUser()
  const { setShowSignout } = useOrders()
  const navigate = useNavigation()

  return (
    <View
      style={{
        paddingTop: insets.top,
      }}
    >
      <View
        style={{
          position: 'absolute',
          height: insets.top,
          backgroundColor: colors.primary,
          width: '100%',
        }}
      />
      <Asset preserveAspectRatio="none" width="100%" />
      <S.Content style={{ top: insets.top }}>
        <View style={{ marginRight: 'auto' }}>
          <MyText style={{ fontFamily: 'Poppins_700Bold' }}>
            Hello, {user?.name.split(' ')[0]}!
          </MyText>
        </View>
        <S.Button onPress={() => setShowSignout(true)}>
          <MaterialIcons name="exit-to-app" size={24} color={colors.white} />
        </S.Button>
        <S.Button
          onPress={() =>
            navigate.dispatch(StackActions.push('profile'))
          }
        >
          <AntDesign name="user" size={24} color={colors.white} />
        </S.Button>
      </S.Content>
    </View>
  )
}

export default CustomHeader
