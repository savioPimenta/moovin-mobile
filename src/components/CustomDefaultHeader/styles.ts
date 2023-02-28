import styled from 'styled-components/native'
import { colors } from '../../lib/colors'

export const Content = styled.View`
  align-items: center;
  justify-content: center;
  padding: 24px;
  width: 100%;
  background: ${colors.primary};
`

export const Button = styled.TouchableOpacity`
  position: absolute;
  left: 12px;
`
