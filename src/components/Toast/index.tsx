import React, { useEffect, useState } from 'react'
import {
  Dimensions,
  Platform,
  StatusBar,
  StatusBarStyle,
  Text,
  View,
  Animated,
  Easing,
  Pressable,
} from 'react-native'

import { FontAwesome5 } from '@expo/vector-icons'
import { useGeneral } from '../../contexts/generalContext'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { colors } from '../../lib/colors'
import MyText from '../Text'

const Toast: React.FC = () => {
  var timer: any = null
  const { toast, clearToast } = useGeneral()
  const { width, height } = Dimensions.get('window')
  const { top } = useSafeAreaInsets()
  const colorsInternal = {
    success: colors.success,
    warn: colors.warning,
    error: colors.error,
    default: colors.secondary,
  }

  const [pos] = useState(new Animated.Value(-(height + 90)))

  function show() {
    timer && clearTimeout(timer)
    Animated.timing(pos, {
      toValue: -height,
      useNativeDriver: true,
      duration: 200,
      easing: Easing.linear,
    }).start()
    timer = setTimeout(() => {
      hide()
    }, toast.duration)
  }

  function hide() {
    Animated.timing(pos, {
      toValue: -(height + 90),
      useNativeDriver: true,
      duration: 200,
      easing: Easing.linear,
    }).start(() => {
      clearToast()
    })
  }

  function zIndex(val: any) {
    return Platform.select({
      ios: { zIndex: val },
      android: { elevation: val },
    })
  }

  useEffect(() => {
    toast.show && show()
  }, [toast])

  return (
    <View style={[{}, { ...zIndex(100) }]}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.primary}
        translucent={true}
      />
      <Animated.View
        style={{
          width,
          position: 'absolute',
          paddingHorizontal: 7,
          paddingBottom: 20,
          paddingTop: top + 20,
          justifyContent: 'center',
          alignSelf: 'center',
          backgroundColor: toast.type
            ? colorsInternal[toast.type as keyof typeof colorsInternal]
            : 'transparent',
          top: 0,
          transform: [{ translateY: pos }],
        }}
      >
        <Pressable
          onPressOut={() => {
            clearTimeout(timer)
            hide()
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,
            }}
          >
            <FontAwesome5 name={toast.iconName} size={20} color="#FFF" />
            <MyText style={{ fontSize: 14, color: '#FFF', marginHorizontal: 16 }}>
              {toast?.message}
            </MyText>
          </View>
        </Pressable>
      </Animated.View>
    </View>
  )
}

export default Toast
