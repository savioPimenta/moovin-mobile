import React, { useState } from 'react'
import { Pressable, TextInput, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { colors } from '../../lib/colors'

// import { Container } from './styles';

interface InputProps {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  placeholder?: string
  isPassword?: boolean
  isEmail?: boolean
}

const Input: React.FC<InputProps> = ({
  value,
  setValue,
  placeholder,
  isPassword,
  isEmail
}) => {
  const [visible, setVisible] = useState(false)
  return (
    <View
      style={{
        width: '100%',
        justifyContent: 'center',
      }}
    >
      <TextInput
        value={value}
        onChangeText={setValue}
        secureTextEntry={isPassword === true && !visible}
        placeholder={placeholder}
        autoCapitalize="none"
        placeholderTextColor={colors.dark3}
        keyboardType={isEmail ? 'email-address' : 'default'}
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
