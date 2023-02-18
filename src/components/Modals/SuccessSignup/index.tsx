import React from 'react'
import { Image, View } from 'react-native'
import Button from '../../Button'
import MyText from '../../Text'
import Asset from '../../../../assets/modal_success.png'

import * as S from './styles'
import { useGeneral } from '../../../contexts/generalContext'

const SuccessSignup: React.FC = () => {
  const { setShowSuccessSignup } = useGeneral()
  return (
    <S.Container>
      <S.Content>
        <Image
          source={Asset}
          style={{ width: '80%', aspectRatio: 1, height: undefined }}
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
          Registration completed successfully!
        </MyText>
        <View style={{ height: 32 }} />
        <Button colorScheme={1} onPress={() => setShowSuccessSignup(false)}>Sign in</Button>
      </S.Content>
    </S.Container>
  )
}

export default SuccessSignup
