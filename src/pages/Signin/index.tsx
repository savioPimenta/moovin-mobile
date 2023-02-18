import React, { useEffect, useState } from 'react'
import AuthFrame from '../../components/AuthFrame'
import Logo from '../../../assets/logo-auth.svg'

import * as S from './styles'
import Input from '../../components/Input'
import { Pressable, View } from 'react-native'
import * as Linking from 'expo-linking'
import MyText from '../../components/Text'
import { colors } from '../../lib/colors'
import Button from '../../components/Button'
import * as WebBrowser from 'expo-web-browser'
import { PLATFORM_URL } from '@env'
import { useGeneral } from '../../contexts/generalContext'

const Signin: React.FC = () => {
  const [result, setResult] = useState<any>(null)
  const { setShowSuccessSignup } = useGeneral()

  const _handlePressButtonAsync = async () => {
    const redirect = Linking.createURL('/')
    const url = PLATFORM_URL + '/signup?redirect_url=' + redirect
    const res = await WebBrowser.openAuthSessionAsync(url, redirect)
    setResult(res)
    return
  }

  useEffect(() => {
    if (result?.type === 'success') {
      setShowSuccessSignup(true)
    }
  }, [result])

  return (
    <AuthFrame>
      <S.Container>
        <Logo height={36} />
        <S.Form>
          <S.Title>Hello! Please login below</S.Title>
          <View style={{ height: 16 }} />
          <Input placeholder="Email" />
          <View style={{ height: 16 }} />
          <Input placeholder="Password" isPassword />
          <View style={{ height: 16 }} />
          <Pressable
            style={{
              marginLeft: 'auto',
            }}
          >
            <MyText style={{ fontSize: 16, color: colors.dark4 }}>
              Forgot password
            </MyText>
          </Pressable>
          <View style={{ height: 32 }} />
          <Button>Sign in</Button>
        </S.Form>
        <View>
          <Pressable onPress={_handlePressButtonAsync}>
            <MyText>
              Do not have an account?{' '}
              <MyText style={{ fontFamily: 'Poppins_700Bold' }}>
                Click here
              </MyText>
            </MyText>
          </Pressable>
        </View>
      </S.Container>
    </AuthFrame>
  )
}

export default Signin
