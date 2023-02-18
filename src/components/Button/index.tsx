import React from 'react'
import { Pressable, View } from 'react-native'
import { colors } from '../../lib/colors'
import MyText from '../Text'

// import { Container } from './styles';

interface ButtonProps {
  colorScheme?: 1 | 2
  children?: any
  onPress?: any
}

const Button: React.FC<ButtonProps> = ({ colorScheme, children, onPress }) => {
  return (
    <View
      style={{
        width: '100%',
      }}
    >
      <Pressable
        onPress={onPress}
        style={{
          width: '100%',
          alignItems: 'center',
          borderRadius: 8,
          backgroundColor:
            colorScheme === 1
              ? colors.white
              : colorScheme === 2
              ? colors.primary
              : colors.secondary,
          padding: 16,
        }}
      >
        <MyText
          style={{
            fontFamily: 'Poppins_700Bold',
            color: colorScheme === 1 ? colors.primary : colors.white,
          }}
        >
          {children}
        </MyText>
      </Pressable>
    </View>
  )
}

export default Button
