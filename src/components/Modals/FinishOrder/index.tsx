import React from 'react'
import { Image, View } from 'react-native'
import Button from '../../Button'
import MyText from '../../Text'
import Asset from '../../../../assets/modal_success.png'

import * as S from './styles'
import { RefuseAndCancel } from '../../../contexts/generalContext'
import { useNavigation, useNavigationState } from '@react-navigation/native'
import { handleChangeStatus } from '../../../pages/Service/statics'

interface FinishOrderProps {
  showFinish: RefuseAndCancel | undefined
  setShowFinish: React.Dispatch<
    React.SetStateAction<RefuseAndCancel | undefined>
  >
  setIsLoading: any
  showError: any
  showSuccess: any
}

const FinishOrder: React.FC<FinishOrderProps> = ({
  setShowFinish,
  showFinish,
  setIsLoading,
  showError,
  showSuccess,
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
          Are you sure you completed the service successfully?
        </MyText>
        <MyText
          style={{
            textAlign: 'center',
            fontSize: 14,
          }}
        >
          After marking it as finished, our team will contact the customer. If
          any irregularity is found, the transporter will be penalized.ƒ
        </MyText>
        <View style={{ height: 32 }} />
        <View style={{ width: '100%' }}>
          <Button colorScheme={2} onPress={() => setShowFinish(undefined)}>
            Keep order opened
          </Button>
          <View style={{ height: 16 }} />
          <Button
            colorScheme={1}
            onPress={async () => {
              await handleChangeStatus(
                4,
                showFinish?.code,
                navigate,
                setIsLoading,
                showError,
                showSuccess,
                showFinish?.callback,
                routesLength > 1
              )
              setShowFinish(undefined)
            }}
          >
            Finish order
          </Button>
        </View>
      </S.Content>
    </S.Container>
  )
}

export default FinishOrder
