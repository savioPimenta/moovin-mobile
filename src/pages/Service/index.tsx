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
          <h1>Service #{response?.code}</h1>
          <div>
            {serviceStatusType.find((e) => e.id === response?.status)?.label}
          </div>
        </S.Header>
        <S.Body style={{ paddingBottom: 8 }}>
          <S.BodyCard>
            <span>
              {response?.date && format(new Date(response.date), 'dd/MM')}
            </span>
            <span>Date</span>
          </S.BodyCard>
          <S.BodyCard>
            <span>
              {response?.date && format(new Date(response.date), 'HH:mm')}
            </span>
            <span>Time</span>
          </S.BodyCard>
          <S.BodyCard>
            <span>{Math.round(parseFloat(response?.distance || '0'))} km</span>
            <span>Distance</span>
          </S.BodyCard>
          <S.BodyCard>
            <span>
              {currencyFormatter.format(
                parseFloat(response?.value || '0') -
                  parseFloat(response?.moovinTax || '0')
              )}
            </span>
            <span>Commission</span>
          </S.BodyCard>
        </S.Body>
        <S.Body style={{ paddingTop: 8, paddingBottom: 8 }}>
          <S.BodyCard isBig>
            <span>{response?.originDesc}</span>
            <span>Origin</span>
          </S.BodyCard>
          <S.BodyCard isBig>
            <span>{response?.destinyDesc}</span>
            <span>Destination</span>
          </S.BodyCard>
        </S.Body>
        {response?.type === 2 ? (
          <S.Body style={{ paddingTop: 8, display: 'flex' }}>
            <S.BodyCard>
              <span>Furnitures</span>
              <S.FurnitureList>
                {response?.furnitures.map((item, i) => {
                  const actualFurniture = furnitureItems.find(
                    (e) => e.id === item.id
                  )

                  return (
                    <div key={i}>
                      <div>
                        {actualFurniture?.icon}
                        <div>{item.qtd}</div>
                      </div>
                      <span>{actualFurniture?.label}</span>
                    </div>
                  )
                })}
              </S.FurnitureList>
            </S.BodyCard>
          </S.Body>
        ) : (
          <S.Body style={{ paddingTop: 8 }} isIconList>
            <S.BodyCard>
              <section>
                <h1>{response?.rooms}</h1>
              </section>
              <span>Rooms</span>
            </S.BodyCard>
            <S.BodyCard>
              <section style={{ opacity: response?.hasLoad ? 1 : 0.3 }}>
                <Feather name="box" size={32} color={colors.white} />
              </section>
              <span>{!response?.hasLoad ? 'No loading' : 'Has loading'}</span>
            </S.BodyCard>
            <S.BodyCard>
              <section style={{ opacity: response?.hasPackage ? 1 : 0.3 }}>
                <FontAwesome5
                  name="truck-loading"
                  size={32}
                  color={colors.white}
                />
              </section>
              <span>
                {!response?.hasPackage ? 'No packaging' : 'Has packaging'}
              </span>
            </S.BodyCard>
          </S.Body>
        )}
      </S.Container>
      <S.Footer>
        {response?.status === 2 && (
          <S.Button secondary onPress={() => setShowRefuse({ code })}>
            Recusar
          </S.Button>
        )}
        {response?.status === 2 && (
          <S.Button
            onPress={() => handleChangeStatus(1, code, navigate, setIsLoading)}
          >
            Aceitar
          </S.Button>
        )}
        {response?.status === 3 && (
          <S.Button secondary onPress={() => code && setShowCancel({ code })}>
            Cancelar
          </S.Button>
        )}
        {response?.status === 3 && (
          <S.Button
            onPress={() => navigate.dispatch(StackActions.push('chat'))}
          >
            Chat
          </S.Button>
        )}
      </S.Footer>
    </S.Content>
  )
}

export default Service
