import styled from 'styled-components/native'
import MyText from '../../components/Text'
import { colors } from '../../lib/colors'

export const Container = styled.View`
  align-items: center;
  padding-top: 64px;
  padding: 64px 32px;
  flex: 1;
`

export const Form = styled.View`
  margin: 64px;
  width: 100%;
  gap: 16px;
  flex: 1;
  justify-content: center;
`

export const Title = styled(MyText)`
  margin-bottom: 32px;
  font-size: 18px;
`
