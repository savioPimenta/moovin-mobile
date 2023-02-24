import { addHours, format, isAfter } from 'date-fns'
import React from 'react'
import { getNewOrders, useOrders } from '../../contexts/orderContext'
import { colors } from '../../lib/colors'
import { currencyFormatter } from '../../lib/helpers'
import { furnitureItems, servicesTypes } from '../ServiceList/statics'
import { Feather } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'

import * as S from './styles'
import { StackActions, useNavigation } from '@react-navigation/native'
import MyText from '../Text'
import { useGeneral } from '../../contexts/generalContext'
import { View } from 'react-native'

export const shadow = {
  shadowColor: '#00',
  shadowOffset: { width: 0, height: 5 },
  shadowOpacity: 0.05,
  shadowRadius: 15,
  elevation: 1,
}

const ServiceCard: React.FC<{
  item: getNewOrders
  isSingle?: boolean
  type: number
}> = ({ item, isSingle, type }) => {
  const { handleGetData } = useOrders()

  const { setShowRefuse, setShowCancel, setShowFinish } = useGeneral()
  const navigate = useNavigation()

  return (
    <S.ServiceCard isSingle={isSingle || false} style={{ ...shadow }}>
      <S.CardContent>
        <S.CardTitle
          onPress={() => {
            navigate.dispatch(
              StackActions.push('service', {
                code: item.code,
              })
            )
          }}
        >
          <MyText
            style={{ color: colors.secondary, fontFamily: 'Poppins_700Bold' }}
          >
            {servicesTypes.find((e) => e.type === item.type)?.label}
          </MyText>
          <MyText style={{ color: colors.dark2 }}>#{item.code}</MyText>
        </S.CardTitle>
        <S.Divisor />
        <S.CardRow>
          <S.CardRowTitle>From</S.CardRowTitle>
          <S.CardRowContent>{item.originShort}</S.CardRowContent>
        </S.CardRow>
        <S.CardRow>
          <S.CardRowTitle>To</S.CardRowTitle>
          <S.CardRowContent>{item.destinyShort}</S.CardRowContent>
        </S.CardRow>
        <S.CardRow>
          <S.CardRowTitle>Date</S.CardRowTitle>
          <S.CardRowContent>
            {format(
              typeof item.date === 'string' ? new Date(item.date) : item.date,
              'dd/MM/yyyy'
            )}
          </S.CardRowContent>
        </S.CardRow>
        <S.CardRow>
          <S.CardRowTitle>Distance</S.CardRowTitle>
          <S.CardRowContent>
            {Math.round(parseFloat(item.distance) * 100) / 100} km
          </S.CardRowContent>
        </S.CardRow>
        <S.CardRow>
          <S.CardRowTitle>Commission</S.CardRowTitle>
          <S.CardRowContent>
            {currencyFormatter.format(
              parseFloat(item.value) - parseFloat(item.moovinTax || '0')
            )}
          </S.CardRowContent>
        </S.CardRow>
      </S.CardContent>
      {(item.hasLoad || item.hasPackage || item.type === 2) && <S.Divisor />}
      {(item.hasLoad || item.hasPackage) && item.type === 1 && (
        <S.CardTagContainer>
          {item.hasPackage && (
            <S.CardTag>
              <S.CardTagIcon>
                <Feather name="box" size={16} color={colors.white} />
              </S.CardTagIcon>
              <S.CardTagTitle>Packaging</S.CardTagTitle>
            </S.CardTag>
          )}
          {item.hasLoad && item.hasPackage && <View style={{ width: 8 }} />}
          {item.hasLoad && (
            <S.CardTag>
              <S.CardTagIcon>
                <FontAwesome5
                  name="truck-loading"
                  size={16}
                  color={colors.white}
                />
              </S.CardTagIcon>
              <S.CardTagTitle>Loading</S.CardTagTitle>
            </S.CardTag>
          )}
        </S.CardTagContainer>
      )}
      {item.type === 2 && item.furnitures && (
        <S.CardFurnitureContainer>
          {item.furnitures.map((item2, i) => {
            return (
              <S.CardFurnitureContent key={i}>
                {furnitureItems.find((e) => e.id === item2.furnitureId)?.icon}
                <S.CardFurnitureQtd>
                  <MyText style={{ color: colors.white, fontSize: 12 }}>
                    {item2.qtd}
                  </MyText>
                </S.CardFurnitureQtd>
              </S.CardFurnitureContent>
            )
          })}
        </S.CardFurnitureContainer>
      )}
      <S.Divisor />
      <S.ButtonsContainer>
        {type === 1 ? (
          <S.RefuseButton
            onPress={() =>
              setShowRefuse({ code: item.code, callback: handleGetData })
            }
          >
            <MyText>Refuse</MyText>
          </S.RefuseButton>
        ) : (
          type === 2 && (
            <S.RefuseButton
              onPress={() =>
                setShowCancel({ code: item.code, callback: handleGetData })
              }
            >
              <MyText>Cancel</MyText>
            </S.RefuseButton>
          )
        )}
        <S.AcceptButton
          onPress={() => {
            navigate.dispatch(
              StackActions.push('service', {
                code: item.code,
              })
            )
          }}
          style={{ marginLeft: 'auto' }}
        >
          <MyText>View</MyText>
        </S.AcceptButton>
        {type === 2 &&
          isAfter(new Date(), addHours(new Date(item.date), 2)) && (
            <S.AcceptButton
              onPress={() => {
                setShowFinish({ code: item.code, callback: handleGetData })
              }}
              style={{ marginLeft: 8, backgroundColor: colors.secondary }}
            >
              <MyText>Finish</MyText>
            </S.AcceptButton>
          )}
      </S.ButtonsContainer>
    </S.ServiceCard>
  )
}

export default ServiceCard
