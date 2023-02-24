import React from 'react'
import { Image, View } from 'react-native'
import Button from '../../Button'
import MyText from '../../Text'
import Asset from '../../../../assets/modal_success.png'

import * as S from './styles'
import { RefuseAndCancel } from '../../../contexts/generalContext'
import { useNavigation } from '@react-navigation/native'
import { handleChangeStatus } from '../../../pages/Service/statics'

interface RefuseOrderProps {
  showRefuse: RefuseAndCancel | undefined
  setShowRefuse: React.Dispatch<
    React.SetStateAction<RefuseAndCancel | undefined>
  >
  setIsLoading: any
}

const RefuseOrder: React.FC<RefuseOrderProps> = ({
  setShowRefuse,
  showRefuse,
  setIsLoading,
}) => {
  const navigate = useNavigation()

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
          Are you sure you want to decline this order?
        </MyText>
        <MyText
          style={{
            textAlign: 'center',
            fontSize: 14,
          }}
        >
          After opting out, this order will no longer appear on your platform
          and app
        </MyText>
        <View style={{ height: 32 }} />
        <View style={{ width: '100%' }}>
          <Button colorScheme={2} onPress={() => setShowRefuse(undefined)}>
            Keep order
          </Button>
          <View style={{ height: 16 }} />
          <Button
            colorScheme={1}
            onPress={async () => {
              await handleChangeStatus(
                2,
                showRefuse?.code,
                navigate,
                setIsLoading,
                showRefuse?.callback
              )
              setShowRefuse(undefined)
            }}
          >
            Refuse
          </Button>
        </View>
      </S.Content>
    </S.Container>
  )
}

export default RefuseOrder
