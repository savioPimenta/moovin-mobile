import React from 'react'
import { View } from 'react-native'
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context'
import Asset from '../../../assets/login-bg.svg'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as S from './styles'
import { useGeneral } from '../../contexts/generalContext'
import SuccessSignup from '../Modals/SuccessSignup'
import { colors } from '../../lib/colors'
import SuccessPass from '../Modals/SuccessPass'

interface AuthFrameProps {
  children: JSX.Element
}

const AuthFrame: React.FC<AuthFrameProps> = ({ children }) => {
  const insets = useSafeAreaInsets()
  const { showSuccessSignup, showSuccessPass } = useGeneral()

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: colors.primary }}
      contentContainerStyle={{ flex: 1 }}
    >
        <S.Container>
          <Asset
            preserveAspectRatio="none"
            width="100%"
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
            }}
          />
          <View
            style={{
              paddingTop: insets.top,
              paddingBottom: insets.bottom,
              flex: 1,
              maxWidth: 580,
            }}
          >
            {children}
          </View>
        </S.Container>
        {showSuccessSignup && <SuccessSignup />}
        {showSuccessPass && <SuccessPass />}
    </KeyboardAwareScrollView>
  )
}

export default AuthFrame
