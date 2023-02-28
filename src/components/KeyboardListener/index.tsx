import React, { useEffect } from 'react'
import { Keyboard, View } from 'react-native'

// import { Container } from './styles';

interface KeyboardListenerProps {
  children: any
  onWillShow: any
  onWillHide: any
}

const KeyboardListener: React.FC<KeyboardListenerProps> = ({
  children,
  onWillHide,
  onWillShow,
}) => {
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardWillShow',
      () => {
        onWillShow()
      }
    )
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardWillHide',
      () => {
        onWillHide()
      }
    )

    return () => {
      keyboardDidHideListener.remove()
      keyboardDidShowListener.remove()
    }
  }, [])
  return <View style={{ flex: 1 }}>{children}</View>
}

export default KeyboardListener
