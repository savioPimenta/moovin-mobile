import React, { useState } from 'react'
import { Pressable, TextInput, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { colors } from '../../lib/colors'
import MyText from '../Text'

// import { Container } from './styles';

interface InputProps {
  value: string
  setValue: (v: string) => any
  placeholder?: string
  isPassword?: boolean
  isEmail?: boolean
  error?: string
  label?: string
  withBg?: boolean
}

const Input: React.FC<InputProps> = ({
  value,
  setValue,
  placeholder,
  isPassword,
  isEmail,
  error,
  label,
  withBg,
}) => {
  const [visible, setVisible] = useState(false)
  return (
    <View
      style={{
        width: '100%',
        justifyContent: 'center',
      }}
    >
      {label && (
        <MyText style={{ marginBottom: 6, fontSize: 14, color: colors.dark2 }}>{label}</MyText>
      )}
      <TextInput
        value={value}
        onChangeText={setValue}
        secureTextEntry={isPassword === true && !visible}
        placeholder={placeholder}
        autoCapitalize="none"
        placeholderTextColor={withBg ? colors.dark2 : colors.dark3}
        keyboardType={isEmail ? 'email-address' : 'default'}
        style={{
          fontFamily: 'Poppins_400Regular',
          paddingHorizontal: 16,
          paddingVertical: 14,
          borderRadius: 8,
          color: withBg ? colors.dark1 : colors.white,
          borderColor: withBg ? 'rgb(230, 234, 241)' : colors.white,
          borderWidth: 1,
          backgroundColor: withBg ? colors.dark4 : 'transparent',
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
          {!visible ? (
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
