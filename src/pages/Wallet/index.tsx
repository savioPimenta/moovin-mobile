import React from 'react'
import { View } from 'react-native'
import ReceiptsList from '../../components/ReceiptsList'

import * as S from './styles'

const Wallet: React.FC = () => {
  return (
    <S.Container>
      <ReceiptsList />
    </S.Container>
  )
}

export default Wallet
