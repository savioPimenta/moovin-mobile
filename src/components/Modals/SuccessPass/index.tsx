import React from 'react'
import { Image, View } from 'react-native'
import Button from '../../Button'
import MyText from '../../Text'
import Asset from '../../../../assets/modal_success.png'

import * as S from './styles'
import { useGeneral } from '../../../contexts/generalContext'
import { StackActions, useNavigation } from '@react-navigation/native'

const SuccessPass: React.FC = () => {
  const { setShowSuccessPass } = useGeneral()
  const navigate = useNavigation()

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
          We sent you a recovery link in the email!
        </MyText>
        <MyText
          style={{
            textAlign: 'center',
            fontSize: 16,
          }}
        >
          Access the link to set a new password. Be sure to check your spam
          folder.
        </MyText>
        <View style={{ height: 32 }} />
        <Button
          colorScheme={1}
          onPress={() => {
            navigate.dispatch(StackActions.pop())
            setShowSuccessPass(false)
          }}
        >
          Back to login
        </Button>
      </S.Content>
    </S.Container>
  )
}

export default SuccessPass
