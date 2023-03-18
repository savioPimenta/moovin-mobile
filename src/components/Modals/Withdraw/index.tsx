import React, { useEffect, useRef, useState } from 'react'
import { Keyboard, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'

import * as S from './styles'
import { useUser } from '../../../contexts/userContext'
import { currencyFormatter, moneyMask } from '../../../lib/helpers'
import { getBalance, withDraw } from '../../../services/order'
import { Ionicons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { colors } from '../../../lib/colors'
import Logo from '../../../../assets/logo-withdraw.svg'

interface WithdrawProps {
  showWithdraw: boolean
  setShowWithdraw: React.Dispatch<React.SetStateAction<boolean>>
  setIsLoading: any
  showError: any
  showSuccess: any
  user: any
  balance: number
  setBalance: React.Dispatch<React.SetStateAction<number>>
}

const Withdraw: React.FC<WithdrawProps> = ({
  setShowWithdraw,
  showWithdraw,
  showError,
  showSuccess,
  setIsLoading,
  user,
  balance,
  setBalance,
}) => {
  const [value, setValue] = useState('0,00')
  const inputRef = useRef<TextInput>(null)
  const invisibleText = useRef<Text>(null)

  const handleGetBalance = async () => {
    setIsLoading(true)
    try {
      const { currentBalance } = await getBalance()
      setBalance(currentBalance)
    } catch (error) {
      showError(error)
    }
    setIsLoading(false)
  }

  const handleWithdraw = async () => {
    setIsLoading(true)
    try {
      const newValue = value.replaceAll('.', '')

      await withDraw(parseFloat(newValue))
      await handleGetBalance()
      setShowWithdraw(!showWithdraw)

      showSuccess('Withdrawal made successfully')
    } catch (error) {
      showError(error)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    handleGetBalance()
    inputRef.current?.focus()
  }, [])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <S.Container>
        <S.ContentModal>
          <S.Header>
            <S.HeaderTitle>Withdraw</S.HeaderTitle>
            <S.CloseButton onPress={() => setShowWithdraw(!showWithdraw)}>
              <Ionicons name="ios-close" size={24} color={colors.dark2} />
            </S.CloseButton>
          </S.Header>
          <S.Body>
            <S.ValueContainer>
              <S.ValuePrefix>€</S.ValuePrefix>
              <View style={{ width: 8 }} />
              <View
                style={{
                  position: 'relative',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    fontFamily: 'Poppins_400Regular',
                    fontSize: 40,
                    width: 'auto',
                  }}
                  numberOfLines={1}
                  onLayout={(e) => {
                    const { width } = e.nativeEvent.layout
                    inputRef.current?.setNativeProps({
                      style: {
                        width,
                      },
                    })
                  }}
                  ref={invisibleText}
                >
                  {value}
                </Text>
                <S.ValueInput
                  ref={inputRef}
                  keyboardType="number-pad"
                  returnKeyType="done"
                  defaultValue={value}
                  maxLength={10}
                  onChange={(e) => {
                    const newValue = moneyMask(e.nativeEvent.text)
                    if (newValue.length <= 10) {
                      setValue(newValue)
                    }
                  }}
                />
              </View>
            </S.ValueContainer>
            <View style={{ height: 8 }} />
            <S.ValueSubtitle>Set the value for you withdraw</S.ValueSubtitle>
            <View style={{ height: 8 }} />
            <S.Divisor />
            <View style={{ height: 8 }} />
            <S.Title>From</S.Title>
            <View style={{ height: 8 }} />
            <S.Card>
              <S.MoovinLogo>
                <Logo />
              </S.MoovinLogo>
              <View style={{ width: 16 }} />
              <S.CardContent>
                <S.CardTitle>Moovin wallet</S.CardTitle>
                <View style={{ height: 2 }} />
                <S.CardText>
                  <S.CardBlackText>
                    {currencyFormatter.format(balance)}
                  </S.CardBlackText>{' '}
                  available
                </S.CardText>
              </S.CardContent>
            </S.Card>
            <View style={{ height: 8 }} />
            <S.Title>To</S.Title>
            <View style={{ height: 8 }} />
            <S.Card>
              <S.MoovinLogo>
                <MaterialCommunityIcons
                  name="bank-outline"
                  size={24}
                  color={colors.dark2}
                />
              </S.MoovinLogo>
              <View style={{ width: 16 }} />
              <S.CardContent>
                <S.CardTitle>{user?.bankName}</S.CardTitle>
                <View style={{ height: 2 }} />
                <S.CardText>
                  IE****************{user?.bankDigits?.slice(-4)}
                </S.CardText>
              </S.CardContent>
            </S.Card>
            <View style={{ height: 8 }} />
            <S.Button
              disabled={balance < parseFloat(value)}
              onPress={handleWithdraw}
            >
              <S.ButtonText>Transfer</S.ButtonText>
            </S.Button>
          </S.Body>
        </S.ContentModal>
      </S.Container>
    </TouchableWithoutFeedback>
  )
}

export default Withdraw
