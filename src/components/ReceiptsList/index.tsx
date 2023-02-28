import React, { useEffect, useState } from 'react'
import { RefreshControl, View } from 'react-native'
import { getNewOrders } from '../../contexts/orderContext'

import * as S from './styles'
import ServiceCard from '../ServiceCard'
import { getBalance, getReceipts } from '../../services/order'
import { useGeneral } from '../../contexts/generalContext'
import { currencyFormatter } from '../../lib/helpers'

import { MaterialCommunityIcons } from '@expo/vector-icons'
import { colors } from '../../lib/colors'

const ReceiptsList: React.FC = () => {
  const { setIsLoading, showError, setShowWithdraw } = useGeneral()
  const [orderLoading, setOrderLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [pageNumber, setPageNumber] = useState<number>()
  const [balance, setBalance] = useState(0)

  const [response, setResponse] = useState<getNewOrders[] | undefined>()

  const handlePagination = (fn: 'next' | 'back' | number) => {
    if (fn === 'next') {
      setPage(page + 1)
    } else if (fn === 'back') {
      setPage(page - 1)
    } else {
      setPage(fn)
    }
  }

  const handleGetData = async (page: number) => {
    setOrderLoading(true)
    try {
      const { orders, pages } = await getReceipts(page)
      pages && setPageNumber(pages)
      setResponse(orders)
    } catch (error) {
      showError(error)
    }
    setOrderLoading(false)
  }

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

  useEffect(() => {
    handleGetBalance()
  }, [])

  useEffect(() => {
    handleGetData(page)
  }, [page])

  return (
    <S.ServicesList
      refreshControl={
        <RefreshControl
          refreshing={orderLoading}
          onRefresh={() => handleGetData(1)}
          progressViewOffset={60}
        />
      }
      contentContainerStyle={[{ alignItems: 'stretch' }]}
      data={response}
      renderItem={({ item, index }) => {
        return (
          <>
            {index === 0 && (
              <View style={{marginTop: 32}}>
                <S.Wallet>
                  <S.WalletHeader>
                    <S.WalletTitle>Current balance</S.WalletTitle>
                    <S.Balance>{currencyFormatter.format(balance)}</S.Balance>
                  </S.WalletHeader>
                  <S.WithdrawButton onPress={() => setShowWithdraw(true)}>
                    <S.WithdrawText>Withdraw</S.WithdrawText>
                    <View style={{ width: 8 }} />
                    <MaterialCommunityIcons
                      name="cash-multiple"
                      size={20}
                      color={colors.primary}
                    />
                  </S.WithdrawButton>
                </S.Wallet>
              </View>
            )}
            <ServiceCard item={item as getNewOrders} type={3} />
          </>
        )
      }}
    ></S.ServicesList>
  )
}

export default ReceiptsList
