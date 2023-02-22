import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { shadow } from '../../components/ServiceCard'
import { furnitureItems } from '../../components/ServiceList/statics'
import MyText from '../../components/Text'
import { useGeneral } from '../../contexts/generalContext'
import { getNewOrders, useOrders } from '../../contexts/orderContext'
import { colors } from '../../lib/colors'
import { currencyFormatter } from '../../lib/helpers'
import { acceptOrder, getUniqueOrders } from '../../services/order'
import { serviceStatusType } from './statics'
import { Feather } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'

import * as S from './styles'
import { StackActions, useNavigation } from '@react-navigation/native'

interface ServiceProps {
  route: any
}

export const handleChangeStatus = async (
  type: any,
  code: any,
  navigate: any,
  setIsLoading: any,
  callback?: any
) => {
  if (code) {
    setIsLoading(true)
    try {
      await acceptOrder(code, type)
      let message
      switch (type) {
        case 1:
          message =
            'Service accepted successfully. You will shortly receive the necessary information by email!'
          break
        case 2:
          message = 'Service refused successfully!'
          break
        default:
          message =
            'Service canceled successfully. We will contact the customer to help them find another service provider!'
          break
      }
      navigate.dispatch(StackActions.push('services'))
      callback && (await callback())
      // showAlert('success', 'Success', message)
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }
}

const Service: React.FC<ServiceProps> = ({ route }) => {
  const { code } = route.params

  const { setIsLoading } = useGeneral()

  const { setShowRefuse, setShowCancel } = useOrders()
  const [response, setResponse] = useState<getNewOrders>()

  const navigate = useNavigation()

  const handleData = async () => {
    if (code) {
      try {
        const res = await getUniqueOrders(code)
        setResponse(res.order)
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    handleData()
  }, [code])

  return (
    <S.Content>
      <S.Container style={{ ...shadow }}>
        <S.Header>
          <S.HeaderTitle>Order #{response?.code}</S.HeaderTitle>
          <S.HeaderLabelContainer>
            <S.HeaderLabel>
              {serviceStatusType.find((e) => e.id === response?.status)?.label}
            </S.HeaderLabel>
          </S.HeaderLabelContainer>
        </S.Header>
        <S.Body>
          <S.BodyCard>
            <S.CardValue>
              {response?.date && format(new Date(response.date), 'dd/MM')}
            </S.CardValue>
            <S.CardLabel>Date</S.CardLabel>
          </S.BodyCard>
          <View style={{ width: 16 }} />
          <S.BodyCard>
            <S.CardValue>
              {response?.date && format(new Date(response.date), 'HH:mm')}
            </S.CardValue>
            <S.CardLabel>Time</S.CardLabel>
          </S.BodyCard>
          <S.BodyCard>
            <S.CardValue>
              {Math.round(parseFloat(response?.distance || '0'))} km
            </S.CardValue>
            <S.CardLabel>Distance</S.CardLabel>
          </S.BodyCard>
          <View style={{ width: 16 }} />
          <S.BodyCard>
            <S.CardValue>
              {currencyFormatter.format(
                parseFloat(response?.value || '0') -
                  parseFloat(response?.moovinTax || '0')
              )}
            </S.CardValue>
            <S.CardLabel>Commission</S.CardLabel>
          </S.BodyCard>
        </S.Body>
        <S.Body>
          <S.BodyCard>
            <S.CardValue isBig>{response?.originDesc}</S.CardValue>
            <S.CardLabel>Origin</S.CardLabel>
          </S.BodyCard>
          <View style={{ width: 16 }} />
          <S.BodyCard>
            <S.CardValue isBig>{response?.destinyDesc}</S.CardValue>
            <S.CardLabel>Destination</S.CardLabel>
          </S.BodyCard>
        </S.Body>
        {response?.type === 2 ? (
          <S.Body>
            <S.BodyCard isBig>
              <S.CardLabel>Furnitures</S.CardLabel>
              <S.FurnitureList>
                {response?.furnitures.map((item, i) => {
                  const actualFurniture = furnitureItems.find(
                    (e) => e.id === item.id
                  )

                  return (
                    <S.FurnitureContainer key={i}>
                      <S.FurnitureContent>
                        <S.FurnitureIcon>
                          {actualFurniture?.icon &&
                            React.cloneElement(actualFurniture?.icon, {
                              fill: colors.white,
                              width: 28,
                              height: 28,
                            })}
                        </S.FurnitureIcon>
                        <S.FurnitureQtd>
                          <MyText
                            style={{
                              fontFamily: 'Poppins_700Bold',
                              color: colors.white,
                              fontSize: 15
                            }}
                          >
                            {item.qtd}
                          </MyText>
                        </S.FurnitureQtd>
                      </S.FurnitureContent>
                      <S.FurnitureTitle>
                        {actualFurniture?.label}
                      </S.FurnitureTitle>
                    </S.FurnitureContainer>
                  )
                })}
              </S.FurnitureList>
            </S.BodyCard>
          </S.Body>
        ) : (
          <S.Body isIconList>
            <S.BodyCard isSpec>
              <S.CardSpecs>
                <S.SpecsTitle>{response?.rooms}</S.SpecsTitle>
              </S.CardSpecs>
              <S.CardLabel>Rooms</S.CardLabel>
            </S.BodyCard>
            <View style={{ width: 16 }} />
            <S.BodyCard isSpec>
              <S.CardSpecs style={{ opacity: response?.hasLoad ? 1 : 0.3 }}>
                <Feather name="box" size={32} color={colors.white} />
              </S.CardSpecs>
              <S.CardLabel>
                {!response?.hasLoad ? 'No loading' : 'Has loading'}
              </S.CardLabel>
            </S.BodyCard>
            <View style={{ width: 16 }} />
            <S.BodyCard isSpec>
              <S.CardSpecs style={{ opacity: response?.hasPackage ? 1 : 0.3 }}>
                <FontAwesome5
                  name="truck-loading"
                  size={32}
                  color={colors.white}
                />
              </S.CardSpecs>
              <S.CardLabel>
                {!response?.hasPackage ? 'No packaging' : 'Has packaging'}
              </S.CardLabel>
            </S.BodyCard>
          </S.Body>
        )}
      </S.Container>
      <S.Footer>
        {response?.status === 2 && (
          <S.Button secondary onPress={() => setShowRefuse({ code })}>
            <S.ButtonText secondary>
            Recusar
            </S.ButtonText>
          </S.Button>
        )}
        {response?.status === 2 && (
          <S.Button
            onPress={() => handleChangeStatus(1, code, navigate, setIsLoading)}
          >
            <S.ButtonText>
            Aceitar
            </S.ButtonText>
          </S.Button>
        )}
        {response?.status === 3 && (
          <S.Button secondary onPress={() => code && setShowCancel({ code })}>
            <S.ButtonText secondary> 
            Cancelar
            </S.ButtonText>
          </S.Button>
        )}
        {response?.status === 3 && (
          <S.Button
            onPress={() => navigate.dispatch(StackActions.push('chat'))}
          >
            <S.ButtonText>
            Chat
            </S.ButtonText>
          </S.Button>
        )}
      </S.Footer>
    </S.Content>
  )
}

export default Service
