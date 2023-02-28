import styled from 'styled-components/native'
import { colors } from '../../lib/colors'
import MyText from '../Text'

export const ServicesList = styled.FlatList`
  padding: 0 32px;
`

export const FilterContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 auto;
  margin-top: 10%;
  padding-top: 32px;
  z-index: 1001;
  max-width: 600px;
`

export const Wallet = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-end;
  background: ${colors.white};
  padding: 18px 26px;
  border-radius: 8px;
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
  margin-top: 10%;
`

export const WalletHeader = styled.View`
`

export const WalletTitle = styled(MyText)`
  font-size: 14px;
  font-family: 'Poppins_500Medium';
  color: ${colors.dark2};
`

export const Balance = styled(MyText)`
  font-size: 32px;
  font-family: 'Poppins_700Bold';
  color: ${colors.primary};
`

export const WithdrawButton = styled.Pressable`
  height: auto;
  border-radius: 5px;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
  margin-left: auto;
`

export const WithdrawText = styled(MyText)`
  color: ${colors.primary};
  font-family: 'Poppins_700Bold';
  font-size: 14px;
`
