import React from 'react'
import { StyleProp, Text, TextStyle } from 'react-native'
import { colors } from '../../lib/colors'

interface TextProps {
  children: any
  style?: StyleProp<TextStyle>
}

const MyText: React.FC<TextProps> = ({ children, style }) => {
  return (
    <Text
      style={[
        {
          color: colors.white,
          fontSize: 16,
          fontFamily: 'Poppins_400Regular',
        },
        style,
      ]}
    >
      {children}
    </Text>
  )
}

export default MyText
