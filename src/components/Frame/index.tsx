import React from 'react'
import { View } from 'react-native'
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'

// import { Container } from './styles';

interface FrameProps {
  children: JSX.Element
}

const Frame: React.FC<FrameProps> = ({ children }) => {
  const insets = useSafeAreaInsets()

  return (
    <SafeAreaProvider>
      <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom, flex: 1 }}>{children}</View>
    </SafeAreaProvider>
  )
}

export default Frame
