import React from 'react'
import { Image, View } from 'react-native'
import Button from '../../Button'
import MyText from '../../Text'
import Asset from '../../../../assets/modal_success.png'

import * as S from './styles'
import { useUser } from '../../../contexts/userContext'

interface SignoutProps {
  showSignout: boolean
  setShowSignout: React.Dispatch<React.SetStateAction<boolean>>
}

const Signout: React.FC<SignoutProps> = ({ setShowSignout, showSignout }) => {
  const { logout } = useUser()
  
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
          Are you sure you want to quit?
        </MyText>
        <MyText
          style={{
            textAlign: 'center',
            fontSize: 14,
          }}
        >
          We will miss you if you leave :(
        </MyText>
        <View style={{ height: 32 }} />
        <View style={{ width: '100%' }}>
          <Button colorScheme={2} onPress={() => setShowSignout(!showSignout)}>
            Cancel
          </Button>
          <View style={{ height: 16 }} />
          <Button
            colorScheme={1}
            onPress={async () => {
              logout()
              setShowSignout(!showSignout)
            }}
          >
            Sign out
          </Button>
        </View>
      </S.Content>
    </S.Container>
  )
}

export default Signout
