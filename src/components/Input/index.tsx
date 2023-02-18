import React, { useState } from 'react'
import { Pressable, TextInput, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { colors } from '../../lib/colors'

// import { Container } from './styles';

interface InputProps {
  placeholder?: string
  isPassword?: boolean
}

const Input: React.FC<InputProps> = ({ placeholder, isPassword }) => {
  const [visible, setVisible] = useState(false)
  return (
    <View
      style={{
        width: '100%',
        justifyContent: 'center',
      }}
    >
      <TextInput
        secureTextEntry={visible}
        placeholder={placeholder}
        autoCapitalize="none"
        placeholderTextColor={colors.dark3}
        style={{
          fontFamily: 'Poppins_400Regular',
          paddingHorizontal: 16,
          paddingVertical: 14,
          borderRadius: 8,
          color: colors.white,
          borderColor: colors.white,
          borderWidth: 1,
        }}
      />
      {isPassword && (
        <Pressable
          onPress={() => {
            setVisible(!visible)
          }}
          style={{
            position: 'absolute',
            right: 16,
          }}
        >
          {visible ? (
            <AntDesign name="eyeo" size={24} color="white" />
          ) : (
            <AntDesign name="eye" size={24} color="white" />
          )}
        </Pressable>
      )}
    </View>
  )
}

export default Input
