import React from 'react'
import { Pressable, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { colors } from '../../lib/colors'
import * as S from './styles'
import { MaterialIcons } from '@expo/vector-icons'
import MyText from '../Text'
import { NativeStackHeaderProps } from '@react-navigation/native-stack'

const CustomDefaultHeader: React.FC<{ props: NativeStackHeaderProps }> = ({ props }) => {
  const insets = useSafeAreaInsets()
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
      <S.Content>
        <View>
          <MyText style={{ fontFamily: 'Poppins_700Bold' }}>{props.options.headerTitle}</MyText>
        </View>
        <S.Button onPress={() => props.navigation.goBack()}>
          <MaterialIcons name="chevron-left" size={32} color={colors.white} />
        </S.Button>
      </S.Content>
    </View>
  )
}

export default CustomDefaultHeader
