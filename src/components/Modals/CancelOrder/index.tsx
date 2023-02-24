import React from 'react'
import { Image, View } from 'react-native'
import Button from '../../Button'
import MyText from '../../Text'
import Asset from '../../../../assets/modal_success.png'

import * as S from './styles'
import { RefuseAndCancel } from '../../../contexts/generalContext'
import { useNavigation, useNavigationState } from '@react-navigation/native'
import { handleChangeStatus } from '../../../pages/Service/statics'

interface CancelOrderProps {
  showCancel: RefuseAndCancel | undefined
  setShowCancel: React.Dispatch<
    React.SetStateAction<RefuseAndCancel | undefined>
  >
  setIsLoading: any
}

const CancelOrder: React.FC<CancelOrderProps> = ({
  setShowCancel,
  showCancel,
  setIsLoading,
}) => {
  const navigate = useNavigation()
  const routesLength = useNavigationState((state) => state.routes.length)

  return (
    <S.Container>
      <S.Content>
        <Image
          source={Asset}
          style={{ width: '70%', aspectRatio: 1, height: undefined }}
          resizeMode="contain"
        />
        <View style={{ height: 32 }} />
        <MyText
          style={{
            textAlign: 'center',
            fontSize: 18,
            fontFamily: 'Poppins_700Bold',
          }}
        >
          Are you sure you want to cancel this order?
        </MyText>
        <MyText
          style={{
            textAlign: 'center',
            fontSize: 14,
          }}
        >
          After canceling, you will get a red flag for irresponsibility with the
          customer and you will not be able to accept that order anymore
        </MyText>
        <View style={{ height: 32 }} />
        <View style={{ width: '100%' }}>
          <Button colorScheme={2} onPress={() => setShowCancel(undefined)}>
            Keep order
          </Button>
          <View style={{ height: 16 }} />
          <Button
            colorScheme={1}
            onPress={async () => {
              await handleChangeStatus(
                3,
                showCancel?.code,
                navigate,
                setIsLoading,
                showCancel?.callback,
                routesLength > 1
              )
              setShowCancel(undefined)
            }}
          >
            Cancel order
          </Button>
        </View>
      </S.Content>
    </S.Container>
  )
}

export default CancelOrder
