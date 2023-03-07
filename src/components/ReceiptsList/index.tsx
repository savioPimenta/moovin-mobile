import React, { useEffect, useState } from 'react'
import { RefreshControl, ScrollView, View } from 'react-native'
import { getNewOrders } from '../../contexts/orderContext'

import * as S from './styles'
import ServiceCard from '../ServiceCard'
import { getBalance, getReceipts } from '../../services/order'
import { useGeneral } from '../../contexts/generalContext'
import { currencyFormatter } from '../../lib/helpers'

import { MaterialCommunityIcons } from '@expo/vector-icons'
import { colors } from '../../lib/colors'
import MyText from '../Text'
import NoOrders from '../NoOrders'
import { useUser } from '../../contexts/userContext'

const ReceiptsList: React.FC = () => {
  const { setIsLoading, showError } = useGeneral()
  const { setShowWithdraw, balance, setBalance } = useUser()
  const [orderLoading, setOrderLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [pageNumber, setPageNumber] = useState<number>()

  const [response, setResponse] = useState<getNewOrders[] | undefined>()

  const handleGetData = async (page: number) => {
    setOrderLoading(true)
    try {
      const { orders, pages } = await getReceipts(page)
      pages && setPageNumber(pages)
      const newResp = response || []
      const obj = [...newResp, ...orders].filter(
        (value, index, self) =>
          index ===
          self.findIndex( 
            (t) => t.code === value.code && t.id === value.id
          )
      )
      
      setResponse(obj.length > 0 ? obj : undefined)
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
    handleGetData(1)
    handleGetBalance()
  }, [])

  const currenceComponent = () => {
    return (
      <View style={{ marginTop: 32 }}>
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
        <MyText
          style={{
            maxWidth: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '100%',
            marginTop: 16,
            color: colors.dark2,
          }}
        >
          Finished services
        </MyText>
        {(!response || response?.length <= 0) && (
          <View style={{ marginTop: 64 }}>
            <NoOrders />
          </View>
        )}
      </View>
    )
  }

  return (
    <S.ServicesList
      refreshControl={
        <RefreshControl
          refreshing={orderLoading}
          onRefresh={() => handleGetData(1)}
          progressViewOffset={60}
        />
      }
      onEndReached={() => {
        if (pageNumber && page < pageNumber) {
          const newPage = page + 1
          handleGetData(newPage)
          setPage(newPage)
        }
      }}
      onEndReachedThreshold={1}
      contentContainerStyle={[{ alignItems: 'stretch' }]}
      data={response && response.length > 0 ? response : [{ isEmpty: true }]}
      renderItem={({ item, index }: { item: any; index: number }) => {
        return (
          <>
            {index === 0 && currenceComponent()}
            {!item.isEmpty && (
              <ServiceCard item={item as getNewOrders} type={3} />
            )}
          </>
        )
      }}
    ></S.ServicesList>
  )
}

export default ReceiptsList
