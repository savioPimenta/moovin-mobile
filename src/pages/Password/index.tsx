import React, { useEffect, useState } from 'react'
import AuthFrame from '../../components/AuthFrame'
import Logo from '../../../assets/logo-auth.svg'

import * as S from './styles'
import Input from '../../components/Input'
import { Pressable, View } from 'react-native'
import MyText from '../../components/Text'
import { colors } from '../../lib/colors'
import Button from '../../components/Button'
import { useGeneral } from '../../contexts/generalContext'
import { useUser } from '../../contexts/userContext'
import { StackActions, useNavigation } from '@react-navigation/native'
import { getResetCode } from '../../services/auth'

const Password: React.FC = () => {
  const [result, setResult] = useState(false)
  const [email, setEmail] = useState('')
  const { setShowSuccessPass, showError, setIsLoading } = useGeneral()
  const navigate = useNavigation()

  const handlePass = async () => {
    if (email === '') {
      showError({ message: 'Fill the form with valid credentials' })
      return
    }
    setIsLoading(true)
    try {
      await getResetCode(email)
      setResult(true)
    } catch (error: any) {
      showError(error)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (result) {
      setShowSuccessPass(true)
    }
  }, [result])

  return (
    <AuthFrame>
      <S.Container>
        <Logo height={36} />
        <S.Form>
          <S.Title>Forgot your password? No problems!</S.Title>
          <MyText>Enter your email below</MyText>
          <View style={{ height: 16 }} />
          <Input
            placeholder="Email"
            value={email}
            setValue={setEmail}
            isEmail
          />
          <View style={{ height: 16 }} />
          <Pressable
            onPress={() => {
              navigate.dispatch(StackActions.push('pass'))
            }}
            style={{
              marginLeft: 'auto',
            }}
          >
            <MyText style={{ fontSize: 16, color: colors.dark4 }}>
              Back to login
            </MyText>
          </Pressable>
          <View style={{ height: 32 }} />
          <Button onPress={handlePass}>Send email</Button>
        </S.Form>
      </S.Container>
    </AuthFrame>
  )
}

export default Password
