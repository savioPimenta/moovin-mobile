import styled from 'styled-components/native'
import { colors } from '../../../lib/colors'

export const Container = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  align-items: center;
  justify-content: center;
  padding: 32px;
`

export const Content = styled.View`
  width: 100%;
  padding: 32px;
  background: ${colors.secondary};
  border-radius: 8px;
  align-items: center;
  max-width: 500px;
`
